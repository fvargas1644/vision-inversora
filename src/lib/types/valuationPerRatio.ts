import { YFinanceChartResultHistory, YFinanceFinancialData } from "../types/yfinance";
import { secEdgarCompanyTickers } from "../types/secEdgar";

export interface ValuationPerRatioFinancialData {
    year: number;
    data: ValuationPerRatioFinancialMetrics;
}
  
interface ValuationPerRatioFinancialMetrics {
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
    stockHistory: YFinanceChartResultHistory[] | any
}