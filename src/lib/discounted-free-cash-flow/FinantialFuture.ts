import { FinancialPast } from "./FinancialPast";
import { generateYears } from "./utilities";

export class FinancialFuture extends FinancialPast{

    dataFutureYear : any[];
    terminalValue;

    constructor (stock: string){
        super(stock);
        this.dataFutureYear = [];
        this.terminalValue = {
            annualFreeCashFlow: 0,
            discountFactor: 0,
            pv: 0
        }
    }

    insertData(){

    }

    calculeRevenue(year : number){
        const  today = new Date();
        const actualYear = today.getFullYear();

        const extractedData = {
            year,
            data: {
                annualNetIncome: 0, 
                annualFreeCashFlow: 0,
                annualTotalRevenue: 0,
                discountFactor: 0,
                pv: 0,
                growthRate: this.growthRateAverage,
                margins: this.marginsAverege,
                freeCashFlowDividedNetIncome: this.freeCashFlowDividedNetIncomeAverage
            }
        };

        if(year === actualYear) {
            const annualTotalRevenuePastYear =  this.dataPastYear.filter((obj) => obj.year === actualYear -1)[0]
            extractedData.data.annualTotalRevenue = annualTotalRevenuePastYear.data.annualTotalRevenue+annualTotalRevenuePastYear.data.annualTotalRevenue*this.growthRateAverage
        } else {
            const annualTotalRevenuePastYear = this.dataFutureYear.filter((obj) => obj.year === year -1)[0]
            extractedData.data.annualTotalRevenue =  annualTotalRevenuePastYear.data.annualTotalRevenue+annualTotalRevenuePastYear.data.annualTotalRevenue*this.growthRateAverage
        }

        return extractedData
        
    }

    calculeNetIncome(){
        this.dataFutureYear.forEach(obj => {
            obj.data.annualNetIncome = obj.data.annualTotalRevenue * obj.data.margins
        });
    }

    calculeFreCashFlow(){
        this.dataFutureYear.forEach(obj => {
            obj.data.annualFreeCashFlow = obj.data.annualNetIncome * obj.data.freeCashFlowDividedNetIncome
        });
    }

    calculeDiscountFactor(){
        const  today = new Date();
        const actualYear = today.getFullYear();

        this.dataFutureYear.forEach(obj => {
            const period = (obj.year - actualYear) +1
            obj.data.discountFactor = (1+this.wacc)**period
        });
    }

    calculePV(){
        this.dataFutureYear.forEach(obj => {
            if (obj.data.discountFactor !== 0) {
                obj.data.pv = obj.data.annualFreeCashFlow/obj.data.discountFactor;
            }
        });
    }

    calculeTerminalValueAnnualFreeCashFlow(futureYears : number[]){
        const lastYear = Math.max(...futureYears);
        this.dataFutureYear.map((obj) => {
            if(obj.year === lastYear) {
                this.terminalValue.annualFreeCashFlow = obj.data.annualFreeCashFlow*(1+0.025)/(this.wacc-0.025)
            }
        })
    }

    calculeTerminalValueAnnualDiscountFactor(futureYears : number[]){
        const lastYear = Math.max(...futureYears);
        this.dataFutureYear.map((obj) => {
            if(obj.year === lastYear) {
                this.terminalValue.discountFactor = obj.data.discountFactor
            }
        })
    }

    calculeTerminalValuePV(){
        if(this.terminalValue.discountFactor !=0)this.terminalValue.pv  = this.terminalValue.annualFreeCashFlow/this.terminalValue.discountFactor;
    }

    async calculeDataFutureYear(){
        const futureYears = generateYears({dataYFinance: this.dataYFinance, type: 'FUTURE_YEARS'})
        if(!futureYears) throw new Error('Las fechas no se asignaron correctamente')

        futureYears.forEach(year => {
            this.dataFutureYear.push(this.calculeRevenue(year));
        });

        this.calculeNetIncome()
        this.calculeFreCashFlow()
        this.calculeDiscountFactor()
        this.calculePV()
        this.calculeTerminalValueAnnualFreeCashFlow(futureYears)
        this.calculeTerminalValueAnnualDiscountFactor(futureYears)
        this.calculeTerminalValuePV()



        console.log(this.dataPastYear)
        console.log(this.dataFutureYear)
        console.log(this.terminalValue)
        console.log(this.wacc)

    }
}