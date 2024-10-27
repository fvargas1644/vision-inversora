import { error } from "console";
import { userAgent, getCookie, getCrumb } from "./requestHeader";

interface YFinanceQueryParams {
    query?: string,
    stock?: string,
}

interface FetchQuery {
    data: null | any,
    error: null | string;
}

export async function yFinanceQuery({query='', stock='APPL'} : YFinanceQueryParams) {
    let paramsArr: string[] = [];

    let fetch : FetchQuery ={
        data: null,
        error: null
    };

    const today = Math.floor(Date.now() / 1000);

    const cookie = await getCookie();

    if (!cookie.cookie) {
        return {
            data: null,
            error: cookie.error,
        };
    }

    const crumb = await getCrumb(cookie.cookie);

    if (!crumb.crumb) {
        return {
            data: null,
            error: crumb.error,
        };
    }

    switch (query) {
        case "DISCOUNTED_FREE_CASH_FLOW":
            paramsArr = [
                "annualTotalRevenue",
                "annualNetIncome",
                "annualFreeCashFlow",
            ];
            
            const paramsString =  paramsArr.map(String).join(",");

            fetch = await fetchYFinance({
                cookie: cookie.cookie,
                stock,
                today,
                crumb: crumb.crumb,
                params: paramsString
            });

        case 'INFO_COMPANY':
            paramsArr = [
                'financialData',
                'defaultKeyStatistics',
                'assetProfile',
                'summaryDetail'
            ]
    }

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
    stock?: string,
    crumb: string,
    params: string,
    today: number
}

async function fetchYFinanceInfoCompany({ cookie, stock = "AAPL", crumb, params, today } : FetchYFinanceParams) {
    const url = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/V?modules=&corsDomain=finance.yahoo.com&formatted=false&symbol=V&crumb=${crumb}`
}


async function fetchYFinance({ cookie, stock = "AAPL", crumb, params, today }: FetchYFinanceParams) {

    const url = `https://query2.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/${stock}?symbol=${stock}&type=${params}&period1=1483142400&period2=${today}&crumb=${crumb}`;

    if (cookie && crumb) {
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
            let data = JSON.parse(result);
            data = data.timeseries.result

            const hasTimestamp = data.every(item=> item.hasOwnProperty('timestamp'));
            
            if(!hasTimestamp) {
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
    } else {
        console.error("Error: cookie or crumb is null");
        const result = cookie
            ? { data: null, error: "Cookie error: cookie is null" }
            : { data: null, error: "Crumb error: crumb is null" };
        return result;
    }
}


