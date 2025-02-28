import { DiscontedFreeCashFlowFinancialData, DiscontedFreeCashFlowPredictionsData } from "@/lib/types/discountedFreeCashFlow";
import { FinancialDataCalculator } from "./FinancialDataCalculator";

export class FinancialPredictionsCalculator extends FinancialDataCalculator {
    protected terminalValue;
    protected intrinsicPrice: number;
    protected growth: number;

    constructor(
        wacc : number, 
        stockPrice : number, 
        sharesOutstanding : number, 
        financialData : DiscontedFreeCashFlowFinancialData[], 
        predictionsData: DiscontedFreeCashFlowPredictionsData[],
        growth: number,
    ){
        super(wacc, stockPrice, sharesOutstanding, financialData, predictionsData)
        this.intrinsicPrice = 0;
        this.terminalValue = {
            annualFreeCashFlow: 0,
            discountFactor: 0,
            pv: 0
        }
        this.growth = growth;
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

    private calculateNetIncome(){
        this.predictionsData.forEach(obj => {
            obj.data.annualNetIncome = obj.data.annualTotalRevenue * obj.data.margins
        });
    }

    private calculateFreCashFlow(){
        this.predictionsData.forEach(obj => {
            obj.data.annualFreeCashFlow = obj.data.annualNetIncome * obj.data.freeCashFlowDividedNetIncome
        });
    }

    private calculateDiscountFactor(){
        const predictionsDataYears = this.predictionsData.map(obj => obj.year)
        const firstYearPredictionsData = Math.min(...predictionsDataYears)

        this.predictionsData.forEach(obj => {
            const period = (obj.year - firstYearPredictionsData) +1
            obj.data.discountFactor = (1+this.wacc)**period
        });
    }

    private calculatePV(){
        this.predictionsData.forEach(obj => {
            if (obj.data.discountFactor !== 0) {
                obj.data.pv = obj.data.annualFreeCashFlow/obj.data.discountFactor;
            }
        });
    }

    private calculateTerminalValueAnnualFreeCashFlow(){
        const lastYear = Math.max(...this.predictionsData.map(obj => obj.year));
        this.predictionsData.forEach((obj) => {
            if(obj.year === lastYear) {
                this.terminalValue.annualFreeCashFlow = obj.data.annualFreeCashFlow*(1+this.growth)/(this.wacc-this.growth)
            }
        })
    }

    private calculateTerminalValueAnnualDiscountFactor(){
        const lastYearPredictionsData = Math.max(...this.predictionsData.map(obj => obj.year));
        this.predictionsData.forEach((obj) => {
            if(obj.year === lastYearPredictionsData) {
                this.terminalValue.discountFactor = obj.data.discountFactor
            }
        })
    }

    private calculateTerminalValuePV(){
        if(this.terminalValue.discountFactor !=0) this.terminalValue.pv  = this.terminalValue.annualFreeCashFlow/this.terminalValue.discountFactor;
    }

    private calculateIntrinsicPrice(){
        let sumPv =0
        this.predictionsData.forEach((obj) =>{
            sumPv += obj.data.pv
        });

        const sum = sumPv + this.terminalValue.pv
        this.intrinsicPrice =sum /this.sharesOutstanding
    }

    calculatePredictionsData(){

        this.predictionsData.forEach(obj => {
            obj.data.growthRate = this.growthRateAverage;
            obj.data.margins = this.marginsAverage;
            obj.data.freeCashFlowDividedNetIncome = this.freeCashFlowDividedNetIncomeAverage;
        })
        
        this.calculateRevenue()
        this.calculateNetIncome()
        this.calculateFreCashFlow()
        this.calculateDiscountFactor()
        this.calculatePV()
        this.calculateTerminalValueAnnualFreeCashFlow()
        this.calculateTerminalValueAnnualDiscountFactor()
        this.calculateTerminalValuePV()
        this.calculateIntrinsicPrice()
    }
}