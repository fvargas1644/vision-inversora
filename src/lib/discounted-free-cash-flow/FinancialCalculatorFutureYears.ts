import { PreviousYearsDataType, FutureYearsDataType } from "@/lib/definitions";
import { FinancialCalculatorPreviousYears } from "./FinancialCalculatorPreviousYears";

export class FinancialCalculatorFutureYears extends FinancialCalculatorPreviousYears {
    protected terminalValue;
    protected intrinsicPrice: number;
    protected growth: number;

    constructor(
        wacc : number, 
        stockPrice : number, 
        sharesOutstanding : number, 
        previousYearsData : PreviousYearsDataType[], 
        futureYearsData: FutureYearsDataType[],
        growth: number,
    ){
        super(wacc, stockPrice, sharesOutstanding, previousYearsData, futureYearsData)
        this.intrinsicPrice = 0;
        this.terminalValue = {
            annualFreeCashFlow: 0,
            discountFactor: 0,
            pv: 0
        }
        this.growth = growth;
    }

    private calculateRevenue(){
        const futureYears = this.futureYearsData.map(obj => obj.year)
        const FirstYearFutureYearsData = Math.min(...futureYears)

        this.futureYearsData.sort((a, b) => a.year - b.year);

        this.futureYearsData.forEach(objForeach =>{
            if(objForeach.year === FirstYearFutureYearsData) {
                const annualTotalRevenuePastYear =  this.previousYearsData.filter((objFilter) => objFilter.year === objForeach.year -1)[0]
                objForeach.data.annualTotalRevenue =annualTotalRevenuePastYear.data.annualTotalRevenue+annualTotalRevenuePastYear.data.annualTotalRevenue*this.growthRateAverage
            } else {
                const annualTotalRevenuePastYear = this.futureYearsData.filter((objFilter) => objFilter.year === objForeach.year-1 )[0]
                objForeach.data.annualTotalRevenue =annualTotalRevenuePastYear.data.annualTotalRevenue+annualTotalRevenuePastYear.data.annualTotalRevenue*this.growthRateAverage
            }
        })
        
    }

    private calculateNetIncome(){
        this.futureYearsData.forEach(obj => {
            obj.data.annualNetIncome = obj.data.annualTotalRevenue * obj.data.margins
        });
    }

    private calculateFreCashFlow(){
        this.futureYearsData.forEach(obj => {
            obj.data.annualFreeCashFlow = obj.data.annualNetIncome * obj.data.freeCashFlowDividedNetIncome
        });
    }

    private calculateDiscountFactor(){
        const futureYears = this.futureYearsData.map(obj => obj.year)
        const FirstYearFutureYearsData = Math.min(...futureYears)

        this.futureYearsData.forEach(obj => {
            const period = (obj.year - FirstYearFutureYearsData) +1
            obj.data.discountFactor = (1+this.wacc)**period
        });
    }

    private calculatePV(){
        this.futureYearsData.forEach(obj => {
            if (obj.data.discountFactor !== 0) {
                obj.data.pv = obj.data.annualFreeCashFlow/obj.data.discountFactor;
            }
        });
    }

    private calculateTerminalValueAnnualFreeCashFlow(){
        const lastYear = Math.max(...this.futureYearsData.map(obj => obj.year));
        this.futureYearsData.forEach((obj) => {
            if(obj.year === lastYear) {
                this.terminalValue.annualFreeCashFlow = obj.data.annualFreeCashFlow*(1+this.growth)/(this.wacc-this.growth)
            }
        })
    }

    private calculateTerminalValueAnnualDiscountFactor(){
        const lastYear = Math.max(...this.futureYearsData.map(obj => obj.year));
        this.futureYearsData.forEach((obj) => {
            if(obj.year === lastYear) {
                this.terminalValue.discountFactor = obj.data.discountFactor
            }
        })
    }

    private calculateTerminalValuePV(){
        if(this.terminalValue.discountFactor !=0) this.terminalValue.pv  = this.terminalValue.annualFreeCashFlow/this.terminalValue.discountFactor;
    }

    private calculateIntrinsicPrice(){
        let sumPv =0
        this.futureYearsData.forEach((obj) =>{
            sumPv += obj.data.pv
        });

        const sum = sumPv + this.terminalValue.pv
        this.intrinsicPrice =sum /this.sharesOutstanding
    }

    calculateFurureYearsData(){

        this.futureYearsData.forEach(obj => {
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