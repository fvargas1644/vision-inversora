interface Meta {
    symbol: string[];
    type: string[];
}

export interface YFinanceFinancialData {
    meta: Meta;
    timestamp: number[];
    annualTotalRevenue?: any[];
    annualFreeCashFlow?: any[];
    annualNetIncome?: any[];
}


export type TypeQueryYFinance = 'FINANCIAL_DATA' | 'COMPANY_INFO' | "HISTORY"

export interface YFinanceQuery {
    query: TypeQueryYFinance,
    ticker: string,
    start ?: number,
    end ?: number,
    interval?: string
}

export interface YFinanceQueryOptions {
    ticker: string,
    crumb: string
}

export interface FetchYFinance {
    cookie: string,
    url: string,
    type: TypeQueryYFinance,
}


interface MetaData {
    symbol: string[];
    type: string[];
}

type FinancialEntryData = {
    dataId: number;
    asOfDate: string; 
    periodType: string;
    currencyCode: string;
    reportedValue: {
        raw: number;
        fmt: string;
    };
};

export interface FinancialEntry {
    meta: MetaData;
    timestamp: number[];
    annualFreeCashFlow?: FinancialEntryData[];
    annualNetIncome?: FinancialEntryData[];
    annualTotalRevenue?: FinancialEntryData[];
}

export type TimeSeriesData = {
    timeseries: {
        result: FinancialEntry[];
        error: null | string;
    };
};
