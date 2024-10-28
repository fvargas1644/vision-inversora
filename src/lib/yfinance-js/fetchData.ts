import { userAgent, getCookie, getCrumb } from "./requestHeader";

interface YFinanceQueryParams {
    query?: string,
    stock?: string,
}

type FetchQuery = {
    data: null | any,
    error: null | string;
}

export async function yFinanceQuery({query='', stock='APPL'} : YFinanceQueryParams) {
    let paramsArr: string[] = [];
    let paramsString : string;
    let url :string = '';
    let type :string = '';

    let fetch : FetchQuery ={
        data: null,
        error: null
    };

    const today = Math.floor(Date.now() / 1000);

    const { cookie , error : cookieError }= await getCookie();

    if (!cookie) {
        console.error("Error: cookie is null");
        return {
            data: null,
            error: cookieError,
        };
    }

    const { crumb, error: crumbError } = await getCrumb(cookie);

    if (!crumb) {
        console.error("Error: crumb is null");
        return {
            data: null,
            error: crumbError,
        };
    }

    switch (query) {
        case "DISCOUNTED_FREE_CASH_FLOW":
            type = 'DISCOUNTED_FREE_CASH_FLOW'

            paramsArr = [ "annualTotalRevenue", "annualNetIncome","annualFreeCashFlow",];

            paramsString =  paramsArr.map(String).join(",");

            url = `https://query2.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/${stock}?symbol=${stock}&type=${paramsString}&period1=1483142400&period2=${today}&crumb=${crumb}`;


            break;

        case 'INFO_COMPANY':
            type = 'INFO_COMPANY'
            paramsArr = [ 'financialData', 'defaultKeyStatistics', 'assetProfile','summaryDetail'];

            paramsString =  paramsArr.map(String).join(",");

            url = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${stock}?modules=${paramsString}&corsDomain=finance.yahoo.com&formatted=false&symbol=${stock}&crumb=${crumb}`
            console.log(url)
            break;
        
    }


    fetch = await fetchYFinance({
        cookie: cookie,
        url,
        type 
    });

    if (fetch.data !== null) {
        return {
            data: fetch.data,
            error: null,
        };
    } else {
        return {
            data: null,
            error: fetch.error,
        };
    }
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

        case 'INFO_COMPANY':
            data = data.quoteSummary.result 
            const financialData = data.some(item=> item.hasOwnProperty('financialData'));
            const defaultKeyStatistics = data.some(item=> item.hasOwnProperty('defaultKeyStatistics'));
            state =  (financialData && defaultKeyStatistics) ? true : false;
            break;
        default:
            console.error('No type in fetch Yahoo Finance')
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
                console.error(`HTTP error status: ${response.status}`);
                return {
                    data: null,
                    error: `HTTP error status: ${response.status}`,
                };
            }

            const result: string = await response.text();
            const dataPreviusValidate = JSON.parse(result);

            const {state : stateValidate, data} = validateFetchYFinance(type, dataPreviusValidate)
            
            if(!stateValidate) {
                console.error('Error: data not found')
                return {
                    data: null,
                    error: `Error: no se han encontrado datos`,
                };
            }

            return {
                data,
                error: null,
            };
        } catch (error) {
            console.error(`Error: ${error}`);
            return {
                data: null,
                error: `Error: ${error}`,
            };
        }
}


