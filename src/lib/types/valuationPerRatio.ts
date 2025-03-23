import { YFinanceChartResultHistory, YFinanceFinancialData } from "../types/yfinance";


export interface ValuationPerRatioFinancialData {
    year: number;
    data: ValuationPerRatioFinancialMetrics;
}
  
export interface ValuationPerRatioFinancialMetrics {
    annualTotalRevenue: number;
    revenueGrowth: number;
    margin: number;
    annualNetIncome: number;
    per: number;
    stockPrice: number;
}

export interface ValuatioPerRatioExtractFinancialData { 
    yFinanceFinancialData : YFinanceFinancialData[],
    year: number,
    stockHistory: YFinanceChartResultHistory[]
}