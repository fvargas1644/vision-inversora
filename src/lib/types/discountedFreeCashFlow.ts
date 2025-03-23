export type DiscontedFreeCashFlowFinancialInformation = {
    annualNetIncome: number,
    annualFreeCashFlow: number,
    annualTotalRevenue: number,
    growthRate: number,
    margins: number,
    freeCashFlowDividedNetIncome: number
}

export type DiscontedFreeCashFlowFinancialData = {
    year: number,
    data: DiscontedFreeCashFlowFinancialInformation
};

export type DiscontedFreeCashFlowPredictionsData = {
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