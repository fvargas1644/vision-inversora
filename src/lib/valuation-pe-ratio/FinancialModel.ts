import { ValuationPerRatioFinancialData } from "../types/valuationPerRatio";
import { FinancialPredictionsCalculator } from "./FinancialPredictionsCalculator";


export class FinancialModel extends FinancialPredictionsCalculator {
    constructor(
        stockPrice : number, 
        sharesOutstanding : number, 
        financialData : ValuationPerRatioFinancialData[], 
        predictionsData: ValuationPerRatioFinancialData[],
        per: number
    ){
        super(stockPrice, sharesOutstanding, financialData, predictionsData, per);
    }

    getFinancialData(){
        return this.financialData;
    }

    getPredictionsData(){
        return this.predictionsData;
    }
}