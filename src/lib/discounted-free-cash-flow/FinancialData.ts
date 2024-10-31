import { FinancialCalculatorFutureYears } from "./FinancialCalculatorFutureYears";
import { PreviousYearsDataType, FutureYearDataType } from "./definitions";

export class FinancialData extends FinancialCalculatorFutureYears {
    constructor(
        wacc : number, 
        stockPrice : number, 
        sharesOutstanding : number, 
        previousYearsData : PreviousYearsDataType[], 
        futureYearsData: FutureYearDataType[]
    ){
        super(wacc, stockPrice, sharesOutstanding, previousYearsData, futureYearsData);
    }

    getIntrinsicPrice(){
        return this.intrinsicPrice; 
    }

    getPreviousYearsData(){
        return this.previousYearsData;
    }

    getFutureYearsData(){
        return this.futureYearsData;
    }
}