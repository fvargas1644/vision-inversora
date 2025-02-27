import { YFinanceChartResultHistory, YFinanceFinancialData } from "../types/yfinance";
import { secEdgarCompanyTickers } from "../types/secEdgar";

export interface ValuationPerRatioFinancialData {
    year: number;
    data: ValuationPerRatioFinancialMetrics;
}
  
interface ValuationPerRatioFinancialMetrics {
    marketCap: number;
    annualTotalRevenue: number;
    revenueGrowth: number;
    margin: number;
    annualNetIncome: number;
    per: number;
    shares: number;
    stockPrice: number;
}

export interface ValuatioPerRatioExtractFinancialData { 
    yFinanceFinancialData : YFinanceFinancialData[],
    companyConcepts: secEdgarCompanyTickers,
    year: number,
    stockHistory: YFinanceChartResultHistory
}