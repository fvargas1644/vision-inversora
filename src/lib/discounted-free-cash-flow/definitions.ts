interface Meta {
    symbol: string[];
    type: string[];
}
  
export interface YFinanceData {
    meta: Meta;
    timestamp: number[];
    annualTotalRevenue?: any[];
    annualFreeCashFlow?: any[]; 
    annualNetIncome?: any[];  
}

export type PreviousYearsDataType = {
    year : number,
    data: {
        annualNetIncome: number, 
        annualFreeCashFlow: number,
        annualTotalRevenue: number,
        growthRate: number,
        margins: number,
        freeCashFlowDividedNetIncome: number
    } 
};

export type FutureYearsDataType = {
    year: number,    
    data: {
        annualNetIncome: number, 
        annualFreeCashFlow: number,
        annualTotalRevenue: number,
        discountFactor: number,
        pv: number,
        growthRate: number,
        margins: number,
        freeCashFlowDividedNetIncome: number
    }
};