import { RequestError } from "../Error";
import { userAgent, getCookie, getCrumb } from "./requestHeader";

interface YFinanceQueryParams {
    query: 'DISCOUNTED_FREE_CASH_FLOW' | 'COMPANY_INFO',
    stock: string,
}

interface YFinanceQueryOptionsParams {
    stock: string,
    crumb: string
}

const YFINANCE_QUERY_OPTIONS = {
    DISCOUNTED_FREE_CASH_FLOW : ({stock, crumb } : YFinanceQueryOptionsParams) => {
        const today = Math.floor(Date.now() / 1000);

        const params = [ "annualTotalRevenue", "annualNetIncome","annualFreeCashFlow"].map(String).join(",");
        const url = `https://query2.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/${stock}?symbol=${stock}&type=${params}&period1=1483142400&period2=${today}&crumb=${crumb}`;
        
        return url
    },
    COMPANY_INFO: ({stock, crumb } : YFinanceQueryOptionsParams) => {
        const params = [ 'financialData', 'defaultKeyStatistics', 'assetProfile','summaryDetail'].map(String).join(",");
        const url = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${stock}?modules=${params}&corsDomain=finance.yahoo.com&formatted=false&symbol=${stock}&crumb=${crumb}`
        
        return url
    }
}

export async function yFinanceQuery({query, stock='APPL'} : YFinanceQueryParams) {

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
    DISCOUNTED_FREE_CASH_FLOW: (data : any[]) => {
        const hasTimestamp = data.timeseries.result.every(item=> item.hasOwnProperty('timestamp'));
        const state =  (hasTimestamp) ? true : false;
        return {
            state,
            data: data.timeseries.result
        }
    },

    COMPANY_INFO: (data : any[]) => {
        const financialData = data.quoteSummary.result.some(item=> item.hasOwnProperty('financialData'));
        const defaultKeyStatistics = data.quoteSummary.result.some(item=> item.hasOwnProperty('defaultKeyStatistics'));
        const state =  (financialData && defaultKeyStatistics) ? true : false;

        return {
            state,
            data: data.quoteSummary.result
        }
    }
}

interface FetchYFinanceParams {
    cookie: string,
    url: string,
    type: 'DISCOUNTED_FREE_CASH_FLOW' | 'COMPANY_INFO',
}

async function fetchYFinance({ cookie, url, type }: FetchYFinanceParams) {
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


