import { FinancialPredictionsCalculator } from "./FinancialPredictionsCalculator";
import { FinancialData, PredictionsData } from "@/lib/definitions";

export class FinancialModel extends FinancialPredictionsCalculator {
    constructor(
        wacc : number, 
        stockPrice : number, 
        sharesOutstanding : number, 
        financialData : FinancialData[], 
        predictionsData: PredictionsData[],
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