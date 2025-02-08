import { RequestError } from "../Error";
import { QuoteSummaryData, TimeSeriesData, YFinanceQueryOptions, YFinanceQuery, FetchYFinance } from "@/lib/definitions";
import { userAgent, getCookie, getCrumb } from "./requestHeader";


const YFINANCE_QUERY_OPTIONS = {
    DISCOUNTED_FREE_CASH_FLOW : ({stock, crumb } : YFinanceQueryOptions) => {
        const today = Math.floor(Date.now() / 1000);
        const params = [ "annualTotalRevenue", "annualNetIncome","annualFreeCashFlow"].map(String).join(",");
        return `https://query2.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/${stock}?symbol=${stock}&type=${params}&period1=1483142400&period2=${today}&crumb=${crumb}`;
        
    },
    COMPANY_INFO: ({stock, crumb } : YFinanceQueryOptions) => {
        const params = [ 'financialData', 'defaultKeyStatistics', 'assetProfile','summaryDetail'].map(String).join(",");
        return `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${stock}?modules=${params}&corsDomain=finance.yahoo.com&formatted=false&symbol=${stock}&crumb=${crumb}` 
    }
}

export async function yFinanceQuery({query, stock='APPL'} : YFinanceQuery) {

    const cookie = await getCookie();
    const crumb = await getCrumb(cookie);

    const url : string= YFINANCE_QUERY_OPTIONS[query]({stock, crumb});
    
    const fetch = await fetchYFinance({
        cookie: cookie,
        url,
        type: query 
    });

    return fetch
}

const VALIDATE_FETCH_YFINANCE = {
    DISCOUNTED_FREE_CASH_FLOW: (data : TimeSeriesData) => {
        const hasTimestamp = data.timeseries.result.every(item=> item.hasOwnProperty('timestamp'));
        const state =  (hasTimestamp) ? true : false;
        return {
            state,
            data: data.timeseries.result
        }
    },

    COMPANY_INFO: (data : QuoteSummaryData) => {
        const financialData = data.quoteSummary.result.some(item=> item.hasOwnProperty('financialData'));
        const defaultKeyStatistics = data.quoteSummary.result.some(item=> item.hasOwnProperty('defaultKeyStatistics'));
        const state =  (financialData && defaultKeyStatistics) ? true : false;

        return {
            state,
            data: data.quoteSummary.result
        }
    }
}

async function fetchYFinance({ cookie, url, type }: FetchYFinance) {
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

            const result: string = await response.text();
            const dataPreviusValidate = JSON.parse(result);

            const {state : stateValidate, data} = VALIDATE_FETCH_YFINANCE[type](dataPreviusValidate)
            
            if(!stateValidate) {
                throw new RequestError('No data found')
            } else { 
                return data;
            }            
        } catch (err) {
            throw new RequestError(String(err))
        }
}


