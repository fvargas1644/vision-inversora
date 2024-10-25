interface Meta {
    symbol: string[];
    type: string[];
}
  
export interface YFinanceDiscountedFreeCashFlow {
    meta: Meta;
    timestamp: number[];
    annualTotalRevenue?: any[];
    annualFreeCashFlow?: any[]; 
    annualNetIncome?: any[];  
}
  
export interface DataDiscountedFreeCashFlow {
    wacc: number;
    dataYFinance: YFinanceDiscountedFreeCashFlow[] | undefined; // Puede ser un arreglo de objetos o undefined
    errors: (string | null)[];
}
