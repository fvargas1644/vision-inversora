import { FinancialPredictionsCalculator } from "./FinancialPredictionsCalculator";
import { PreviousYearsDataType, FutureYearsDataType } from "@/lib/definitions";

export class FinancialModel extends FinancialPredictionsCalculator {
    constructor(
        wacc : number, 
        stockPrice : number, 
        sharesOutstanding : number, 
        financialData : PreviousYearsDataType[], 
        predictionsData: FutureYearsDataType[],
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