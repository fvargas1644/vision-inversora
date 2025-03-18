import { RequestError } from "../Error";
import { YFinanceQuoteSummaryData, YFinanceTimeSeriesData, YFinanceQueryOptions, YFinanceQuery, YFinanceFetch, YFinanceTradingDataHistory } from "@/lib/types/yfinance";
import { userAgent, getCookie, getCrumb } from "./requestHeader";


const YFINANCE_QUERY_OPTIONS = {
    FINANCIAL_DATA : ({ticker, crumb } : YFinanceQueryOptions) => {
        const today = Math.floor(Date.now() / 1000);
        const params = [ "annualTotalRevenue", "annualNetIncome","annualFreeCashFlow"].map(String).join(",");
        return `https://query2.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/${ticker}?symbol=${ticker}&type=${params}&period1=1483142400&period2=${today}&crumb=${crumb}`;
        
    },
    COMPANY_INFO: ({ticker, crumb } : YFinanceQueryOptions) => {
        const params = [ 'financialData', 'defaultKeyStatistics', 'assetProfile','summaryDetail'].map(String).join(",");
        return `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?modules=${params}&corsDomain=finance.yahoo.com&formatted=false&symbol=${ticker}&crumb=${crumb}` 
    },
    HISTORY_BY_DATE : ({ticker, crumb, start, end ,interval} : any) => {
        return `https://query2.finance.yahoo.com/v8/finance/chart/${ticker}?period1=${start}&period2=${end}&interval=${interval}&includePrePost=False&events=div%2Csplits%2CcapitalGains&crumb=${crumb}`
    }
}

export async function queryYFinance({query, ticker='APPL', start, end, interval} : YFinanceQuery) {

    const cookie = await getCookie();
    const crumb = await getCrumb(cookie);

    const url = () : string => { 
        if(query === "HISTORY_BY_DATE") {
            return YFINANCE_QUERY_OPTIONS["HISTORY_BY_DATE"]({ticker, crumb, start, end, interval});
        } else {
            return YFINANCE_QUERY_OPTIONS[query]({ticker, crumb});
        }
    };
    
    const fetch = await fetchYFinance({
        cookie: cookie,
        url: url(),
        type: query 
    });

    return fetch
}

const VALIDATE_FETCH_YFINANCE = {
    FINANCIAL_DATA: (data : YFinanceTimeSeriesData) => {
        const hasTimestamp = data.timeseries.result.every(item=> item.hasOwnProperty('timestamp'));
        const state =  (hasTimestamp) ? true : false;
        return {
            state,
            data: data.timeseries.result
        }
    },

    COMPANY_INFO: (data : YFinanceQuoteSummaryData) => {
        const financialData = data.quoteSummary.result.some(item=> item.hasOwnProperty('financialData'));
        const defaultKeyStatistics = data.quoteSummary.result.some(item=> item.hasOwnProperty('defaultKeyStatistics'));
        const state =  (financialData && defaultKeyStatistics) ? true : false;

        return {
            state,
            data: data.quoteSummary.result
        }
    },
    
    HISTORY_BY_DATE: (data : YFinanceTradingDataHistory) => {
        const financialData = data.chart.result.some(item => item.indicators.adjclose.length > 0);
        const state =  (financialData ) ? true : false;
        return {
            state,
            data: data.chart.result
        }
    }
}

async function fetchYFinance({ cookie, url, type }: YFinanceFetch) {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "User-Agent": userAgent,
                    "Accept-Encoding": "gzip, deflate",
                    Accept: "*/*",
                    Connection: "keep-alive",
                    Cookie: cookie,
                },
            });

            if (!response.ok) {
                throw new RequestError('Request no ok')
            }

            const result = await response.json();

            const {state : stateValidate, data} = VALIDATE_FETCH_YFINANCE[type](result)
            
            if(!stateValidate) {
                throw new RequestError('No data found')
            } else { 
                return data;
            }            
        } catch (err) {
            throw new RequestError(String(err))
        }
}


