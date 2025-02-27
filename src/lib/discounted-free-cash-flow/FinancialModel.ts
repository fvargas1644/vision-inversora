import { FinancialPredictionsCalculator } from "./FinancialPredictionsCalculator";
import { DiscontedFreeCashFlowFinancialData, DiscontedFreeCashFlowPredictionsData } from "@/lib/types/discountedFreeCashFlow";

export class FinancialModel extends FinancialPredictionsCalculator {
    constructor(
        wacc : number, 
        stockPrice : number, 
        sharesOutstanding : number, 
        financialData : DiscontedFreeCashFlowFinancialData[], 
        predictionsData: DiscontedFreeCashFlowPredictionsData[],
        growth: number
    ){
        super(wacc, stockPrice, sharesOutstanding, financialData, predictionsData, growth);
    }

    getIntrinsicPrice(){
        return this.intrinsicPrice; 
    }

    getFinancialData(){
        return this.financialData;
    }

    getPredictionsData(){
        return this.predictionsData;
    }
}