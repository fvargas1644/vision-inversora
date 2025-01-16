import { PreviousYearsDataType, FutureYearsDataType } from "@/lib/discounted-free-cash-flow/definitions";

export interface FinancialData {
    previousYearsData: PreviousYearsDataType[];
    futureYearsData: FutureYearsDataType[];
    intrinsicPrice: number;
    stockPrice: number;
    wacc: number; 
    growth: number; 
}

export type UpdateStatusOptions = 'unstarted' | 'processing' | 'success' | 'error';

export interface UpdateFinancialData {
    wacc: number, 
    growth: number
}

export interface CashFlowContextInterface {
    financialData: FinancialData | null;
    updateFinancialData: (({wacc, growth} : UpdateFinancialData) => Promise<UpdateStatusOptions>) | null;
}