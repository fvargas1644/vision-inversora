import { FinancialData, PredictionsData } from "@/lib/definitions";

export interface FinancialModel {
    financialData: FinancialData[];
    predictionsData: PredictionsData[];
    intrinsicPrice: number;
    stockPrice: number;
    wacc: number; 
    growth: number; 
}

export type UpdateStatusOptions = 'unstarted' | 'processing' | 'success' | 'error';

export interface updateFinancialModel {
    wacc: number, 
    growth: number
}

export interface CashFlowContext {
    financialModel: FinancialModel | null;
    updateFinancialModel: (({wacc, growth} : updateFinancialModel) => Promise<UpdateStatusOptions>) | null;
}

/** Analysis */

export interface AnalysisContextInterface {
    ticker: string, 
    company: string,
    cik: number | null
}