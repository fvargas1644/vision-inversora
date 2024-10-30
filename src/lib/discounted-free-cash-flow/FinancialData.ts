import { PreviusYearDataType, FutureYearDataType } from "./definitions";

export class FinancialData {
    wacc : number;
    stockPrice : number;
    sharesOutstanding : number;
    previousYearsData: PreviusYearDataType[];
    futureYearsData: FutureYearDataType[];
    growthRateAverage: number;
    freeCashFlowDividedNetIncomeAverage: number;
    marginsAverege: number;
    terminalValue;
    intrinsicPrice: number;

    constructor(
        wacc : number, 
        stockPrice : number, 
        sharesOutstanding : number, 
        previousYearsData : PreviusYearDataType[], 
        futureYearsData: FutureYearDataType[]
    ){
        this.wacc = wacc;
        this.stockPrice = stockPrice;
        this.sharesOutstanding = sharesOutstanding;
        this.previousYearsData =previousYearsData;
        this.futureYearsData = futureYearsData;
        this.growthRateAverage = 0;
        this.freeCashFlowDividedNetIncomeAverage = 0;
        this.marginsAverege = 0;
        this.intrinsicPrice = 0;
        this.terminalValue = {
            annualFreeCashFlow: 0,
            discountFactor: 0,
            pv: 0
        }
    }

    calculeGrowthRate(){
        const previousYears = new Map(this.previousYearsData.map(obj => [obj.year, obj.data.annualTotalRevenue]));
    
        this.previousYearsData.forEach(obj => {
            const previousRevenue = previousYears.get(obj.year - 1);
            if (previousRevenue && previousRevenue !== 0) {
                obj.data.growthRate = (obj.data.annualTotalRevenue - previousRevenue) / previousRevenue;
            }
        });
    }

    calculeAverage(property: string,calcFunction: (data: any) => number){
        const allData : number[] = []
        this.previousYearsData.forEach((obj) => {
            if(obj.data[property] != 0) {
                allData.push(obj.data[property])
            }
        })

        if(allData.length > 0) {
            const sum = allData.reduce((acc, num) => acc + num, 0);

            // Calcular el promedio
            calcFunction(sum / allData.length);
        } 
            
    }

    calculateProperty(property: string, div: string,calcFunction: (data: any) => number) {
        this.previousYearsData.forEach(obj => {
            if (obj.data[div] !== 0) {
                obj.data[property] = calcFunction(obj.data);
            }
        });
    }

    calculePreviusYearData(){
        this.calculeGrowthRate()
        this.calculeAverage('growthRate', data => this.growthRateAverage = data );
        
        this.previousYearsData.map((obj) => {
            if(obj.data.growthRate===0) {
                obj.data.growthRate = this.growthRateAverage;
            }
        })
        
        this.calculateProperty('margins', 'annualTotalRevenue', data => data.annualNetIncome / data.annualTotalRevenue);
        this.calculateProperty('freeCashFlowDividedNetIncome', 'annualNetIncome', data => data.annualFreeCashFlow / data.annualNetIncome);
        this.calculeAverage('freeCashFlowDividedNetIncome', data => this.freeCashFlowDividedNetIncomeAverage = data );
        this.calculeAverage('margins', data => this.marginsAverege = data );
    }

    calculeRevenue(){
        const  today = new Date();
        const actualYear = today.getFullYear();

        this.futureYearsData.sort((a, b) => a.year - b.year);

        this.futureYearsData.forEach(objForeach =>{
            if(objForeach.year === actualYear) {
                const annualTotalRevenuePastYear =  this.previousYearsData.filter((objFilter) => objFilter.year === objForeach.year -1)[0]
                objForeach.data.annualTotalRevenue =annualTotalRevenuePastYear.data.annualTotalRevenue+annualTotalRevenuePastYear.data.annualTotalRevenue*this.growthRateAverage
            } else {
                const annualTotalRevenuePastYear = this.futureYearsData.filter((objFilter) => objFilter.year === objForeach.year-1 )[0]
                objForeach.data.annualTotalRevenue =annualTotalRevenuePastYear.data.annualTotalRevenue+annualTotalRevenuePastYear.data.annualTotalRevenue*this.growthRateAverage
            }
        })
        
    }

    calculeNetIncome(){
        this.futureYearsData.forEach(obj => {
            obj.data.annualNetIncome = obj.data.annualTotalRevenue * obj.data.margins
        });
    }

    calculeFreCashFlow(){
        this.futureYearsData.forEach(obj => {
            obj.data.annualFreeCashFlow = obj.data.annualNetIncome * obj.data.freeCashFlowDividedNetIncome
        });
    }

    calculeDiscountFactor(){
        const  today = new Date();
        const actualYear = today.getFullYear();

        this.futureYearsData.forEach(obj => {
            const period = (obj.year - actualYear) +1
            obj.data.discountFactor = (1+this.wacc)**period
        });
    }

    calculePV(){
        this.futureYearsData.forEach(obj => {
            if (obj.data.discountFactor !== 0) {
                obj.data.pv = obj.data.annualFreeCashFlow/obj.data.discountFactor;
            }
        });
    }

    calculeTerminalValueAnnualFreeCashFlow(){
        const lastYear = Math.max(...this.futureYearsData.map(obj => obj.year));
        this.futureYearsData.forEach((obj) => {
            if(obj.year === lastYear) {
                this.terminalValue.annualFreeCashFlow = obj.data.annualFreeCashFlow*(1+0.025)/(this.wacc-0.025)
            }
        })
    }

    calculeTerminalValueAnnualDiscountFactor(){
        const lastYear = Math.max(...this.futureYearsData.map(obj => obj.year));
        this.futureYearsData.forEach((obj) => {
            if(obj.year === lastYear) {
                this.terminalValue.discountFactor = obj.data.discountFactor
            }
        })
    }

    calculeTerminalValuePV(){
        if(this.terminalValue.discountFactor !=0) this.terminalValue.pv  = this.terminalValue.annualFreeCashFlow/this.terminalValue.discountFactor;
    }

    calculateIntrinsicPrice(){
        let sumPv =0
        this.futureYearsData.forEach((obj) =>{
            sumPv += obj.data.pv
        });

        const sum = sumPv + this.terminalValue.pv
        this.intrinsicPrice =sum /this.sharesOutstanding
    }

    calculeFurureYearData(){

        this.futureYearsData.forEach(obj => {
            obj.data.growthRate = this.growthRateAverage;
            obj.data.margins = this.marginsAverege;
            obj.data.freeCashFlowDividedNetIncome = this.freeCashFlowDividedNetIncomeAverage;
        })
        
        this.calculeRevenue()
        this.calculeNetIncome()
        this.calculeFreCashFlow()
        this.calculeDiscountFactor()
        this.calculePV()
        this.calculeTerminalValueAnnualFreeCashFlow()
        this.calculeTerminalValueAnnualDiscountFactor()
        this.calculeTerminalValuePV()
        this.calculateIntrinsicPrice()
        
    }
}