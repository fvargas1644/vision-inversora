import { ValuationPerRatioFinancialData } from "../types/valuationPerRatio";
import { FinancialDataCalculator } from "./FinancialDataCalculator";

export class FinancialPredictionsCalculator extends FinancialDataCalculator {
    protected marginsAverage : number;

    constructor(
        stockPrice : number, 
        sharesOutstanding : number, 
        financialData : ValuationPerRatioFinancialData[], 
        predictionsData: ValuationPerRatioFinancialData[],
        per: number,
    ){
        super(stockPrice, sharesOutstanding, financialData, predictionsData, per);
        this.marginsAverage = 0;
    }

    private calculateRevenue(){
        const predictionsDataYears = this.predictionsData.map(obj => obj.year);
        const firstYearPredictionsData = Math.min(...predictionsDataYears);

        // Reordenar de menor a mayor
        this.predictionsData.sort((a, b) => a.year - b.year);

        this.predictionsData.forEach(objForeach =>{
            if(objForeach.year === firstYearPredictionsData) {
                const annualTotalRevenuePastYear =  this.financialData.filter((objFilter) => objFilter.year === objForeach.year -1)[0]
                objForeach.data.annualTotalRevenue =annualTotalRevenuePastYear.data.annualTotalRevenue+annualTotalRevenuePastYear.data.annualTotalRevenue*this.growthRateAverage
            } else {
                const annualTotalRevenuePastYear = this.predictionsData.filter((objFilter) => objFilter.year === objForeach.year-1 )[0]
                objForeach.data.annualTotalRevenue =annualTotalRevenuePastYear.data.annualTotalRevenue+annualTotalRevenuePastYear.data.annualTotalRevenue*this.growthRateAverage
            }
        })
        
    }

    calculatePredictionsData(){
        this.predictionsData.forEach(obj => {
            obj.data.revenueGrowth = this.growthRateAverage;
            obj.data.margin = this.marginsAverage;
            obj.data.per = this.per; 
            obj.data.shares = this.sharesAverage;
        });

        this.calculateRevenue();

        this.predictionsData.forEach(obj => {
            obj.data.annualNetIncome = obj.data.annualTotalRevenue * obj.data.margin;
            if(obj.data.shares !== 0){
                obj.data.stockPrice = obj.data.per * obj.data.annualNetIncome/obj.data.shares;
            }
        });

        this.predictionsData.forEach(obj => {
            obj.data.marketCap = obj.data.stockPrice * obj.data.shares;
        });
    }
}    