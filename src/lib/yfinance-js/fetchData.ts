import { RequestError } from "../Error";
import { userAgent, getCookie, getCrumb } from "./requestHeader";

interface YFinanceQueryParams {
    query?: string,
    stock?: string,
}

export async function yFinanceQuery({query='', stock='APPL'} : YFinanceQueryParams) {
    let paramsArr: string[] = [];
    let paramsString : string;
    let url :string = '';
    let type :string = '';

    const today = Math.floor(Date.now() / 1000);

    const cookie = await getCookie();
    const crumb = await getCrumb(cookie);

    switch (query) {
        case "DISCOUNTED_FREE_CASH_FLOW":
            type = 'DISCOUNTED_FREE_CASH_FLOW'
            paramsArr = [ "annualTotalRevenue", "annualNetIncome","annualFreeCashFlow",];
            paramsString =  paramsArr.map(String).join(",");
            url = `https://query2.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/${stock}?symbol=${stock}&type=${paramsString}&period1=1483142400&period2=${today}&crumb=${crumb}`;
            break;

        case 'COMPANY_INFO':
            type = 'COMPANY_INFO'
            paramsArr = [ 'financialData', 'defaultKeyStatistics', 'assetProfile','summaryDetail'];
            paramsString =  paramsArr.map(String).join(",");
            url = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${stock}?modules=${paramsString}&corsDomain=finance.yahoo.com&formatted=false&symbol=${stock}&crumb=${crumb}`
            break;
        
    }


    const fetch = await fetchYFinance({
        cookie: cookie,
        url,
        type 
    });

    return fetch
}

interface FetchYFinanceParams {
    cookie: string,
    url: string,
    type: string
}

function validateFetchYFinance(type :string, data : any[]){
    let state = false;
    switch (type) {
        case 'DISCOUNTED_FREE_CASH_FLOW':
            data = data.timeseries.result 
            const hasTimestamp = data.every(item=> item.hasOwnProperty('timestamp'));
            state =  (hasTimestamp) ? true : false;
            break;

        case 'COMPANY_INFO':
            data = data.quoteSummary.result 
            const financialData = data.some(item=> item.hasOwnProperty('financialData'));
            const defaultKeyStatistics = data.some(item=> item.hasOwnProperty('defaultKeyStatistics'));
            state =  (financialData && defaultKeyStatistics) ? true : false;
            break;
    }
    return {state, data};
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

            const {state : stateValidate, data} = validateFetchYFinance(type, dataPreviusValidate)
            
            if(!stateValidate) {
                throw new RequestError('No data found')
            } else { 
                return data;
            }            
        } catch (err) {
            throw new RequestError(String(err))
        }
}


