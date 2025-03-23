import { RequestError } from "@/lib/Error/Error";
import { YFinanceQuoteSummaryData, YFinanceTimeSeriesData, YFinanceQuery, YFinanceFetch, YFinanceTradingDataHistory } from "@/lib/types/yfinance";
import { userAgent, getCookie, getCrumb } from "./requestHeader";


const YFINANCE_QUERY_OPTIONS = {
    FINANCIAL_DATA: ({ ticker }: {ticker : string}) => {
        const today = Math.floor(Date.now() / 1000);
        const params = ["annualTotalRevenue", "annualNetIncome", "annualFreeCashFlow"].map(String).join(",");
        return `https://query2.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/${ticker}?symbol=${ticker}&type=${params}&period1=1483142400&period2=${today}`;

    },
    COMPANY_INFO: ({ ticker, crumb }: {ticker: string, crumb: string}) => {
        const params = ['financialData', 'defaultKeyStatistics', 'assetProfile', 'summaryDetail'].map(String).join(",");
        return `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?modules=${params}&corsDomain=finance.yahoo.com&formatted=false&symbol=${ticker}&crumb=${crumb}`
    },
    HISTORY_BY_DATE: ({ ticker, start, end, interval }: any) => {
        return `https://query2.finance.yahoo.com/v8/finance/chart/${ticker}?period1=${start}&period2=${end}&interval=${interval}&includePrePost=False&events=div%2Csplits%2CcapitalGains`
    },

    HISTORY_BY_INTERVAL: ({ ticker, range, interval }: any) => {
        return `https://query2.finance.yahoo.com/v8/finance/chart/${ticker}?range=${range}&interval=${interval}&includePrePost=False&events=div%2Csplits%2CcapitalGains`
    }
}

export async function queryYFinance({ query, ticker = 'APPL', start, end, interval, range }: YFinanceQuery) {

    const cookie = (query === "COMPANY_INFO") ? await getCookie() : "";
    const crumb = (query === "COMPANY_INFO") ? await getCrumb(cookie) : "";

    const url = (): string => {
        if (query === "HISTORY_BY_DATE") {
            return YFINANCE_QUERY_OPTIONS["HISTORY_BY_DATE"]({ ticker, crumb, start, end, interval });
        } else if (query === "HISTORY_BY_INTERVAL") {
            return YFINANCE_QUERY_OPTIONS["HISTORY_BY_INTERVAL"]({ ticker, crumb, interval, range });
        } else {
            return YFINANCE_QUERY_OPTIONS[query]({ ticker, crumb });
        }
    };

    const fetch = await fetchYFinance({
        cookie: cookie,
        url: url(),
        type: query
    });

    return fetch
}


const extractError = (error: { code: string, description: string } | null, data: boolean) => {
    if (error) {
        return error.code
    }

    if (!data) {
        return "Parameters no found"
    }
}

const validateHistory = (data: YFinanceTradingDataHistory) => {
    if (data.chart.result) {
        const financialData = data.chart.result.some(item => item.indicators.adjclose.length > 0);
        const thereIsData = (financialData) ? true : false;
        const error = extractError(data.chart.error, thereIsData)
        return {
            error,
            data: data.chart.result
        }
    } else {
        return {
            error: "No data found",
            data: null
        }
    }

}

const VALIDATE_FETCH_YFINANCE = {
    FINANCIAL_DATA: (data: YFinanceTimeSeriesData) => {
        if (data.timeseries.result) {

            const hasTimestamp = data.timeseries.result.every(item => item.hasOwnProperty('timestamp'));
            const thereIsData = (hasTimestamp) ? true : false;
            const error = extractError(data.timeseries.error, thereIsData)

            return {
                error,
                data: data.timeseries.result
            }
        } else {
            return {
                error: "No data found",
                data: null
            }
        }
    },

    COMPANY_INFO: (data: YFinanceQuoteSummaryData) => {
        if (data.finance) {
            return {
                error: data.finance.error.code,
                data: null
            }
        }

        if (data.quoteSummary.result) {
            const financialData = data.quoteSummary.result.some(item => item.hasOwnProperty('financialData'));
            const defaultKeyStatistics = data.quoteSummary.result.some(item => item.hasOwnProperty('defaultKeyStatistics'));
            const thereIsData = (financialData && defaultKeyStatistics) ? true : false;
            const error = extractError(data.quoteSummary.error, thereIsData)

            return {
                error,
                data: data.quoteSummary.result
            }
        } else {
            return {
                error: "No data found",
                data: null
            }
        }

    },

    HISTORY_BY_DATE: validateHistory,

    HISTORY_BY_INTERVAL: validateHistory,
}

async function fetchYFinance({ cookie, url, type }: YFinanceFetch) {
    let result;
    try {

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": userAgent,
                "Accept-Encoding": "gzip, deflate",
                Accept: "*/*",
                Connection: "keep-alive",
                Cookie: cookie
            },
        });

        result = await response.json();
        console.log(url)
    } catch (err) {
        throw new RequestError(String(err))
    }

    const { error, data } = VALIDATE_FETCH_YFINANCE[type](result)

    if (error) {
        throw new RequestError(error)
    } else {
        return data;
    }
}


