import { ValuationPerRatioFinancialData } from "../types/valuationPerRatio";

export class FinancialDataCalculator {
    protected stockPrice : number;
    protected sharesOutstanding : number;
    protected financialData: ValuationPerRatioFinancialData[];
    protected predictionsData: ValuationPerRatioFinancialData[];

    constructor(
        stockPrice : number, 
        sharesOutstanding : number, 
        financialData : ValuationPerRatioFinancialData[], 
        predictionsData: ValuationPerRatioFinancialData[]) {
            
        this.stockPrice = stockPrice;
        this.sharesOutstanding = sharesOutstanding;
        this.financialData =financialData;
        this.predictionsData = predictionsData;
    }

    private calculateAverage(
        property:  'margin'
    ) {
        const relevantData = this.financialData.map(obj => obj.data[property]).filter(value => value !== 0);
        return relevantData.length > 0 ? relevantData.reduce((acc, num) => acc + num, 0) / relevantData.length : 0;
    }

    calculateFinancialData(){
        console.log(this.financialData)
    }
}