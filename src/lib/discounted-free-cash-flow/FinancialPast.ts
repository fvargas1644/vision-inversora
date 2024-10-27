import { YFinanceDiscountedFreeCashFlow } from "../definitions";
import { getWacc } from "../getWacc";
import { yFinanceQuery } from "../yfinance-js/getData";
import { extractYFinanceData, generateYears } from "./utilities";

export class FinancialPast {
    wacc : number;
    stock: string;
    dataYFinance: undefined | YFinanceDiscountedFreeCashFlow[]; 
    error: (string|null)[];
    dataPastYear: any[];
    growthRateAverage: number;
    freeCashFlowDividedNetIncomeAverage: number;
    marginsAverege: number;

    constructor(stock: string) {
        if (!stock) throw new Error('El stock no puede estar vacío');
        this.stock = stock;
        this.wacc = 0.0;
        this.dataYFinance = undefined;
        this.error = []
        this.dataPastYear = []
        this.growthRateAverage = 0
        this.freeCashFlowDividedNetIncomeAverage = 0
        this.marginsAverege = 0;
    }

    async getData(){
        const { wacc: fetchedWacc, error: waccError } = await getWacc(this.stock);
        this.wacc = fetchedWacc || 0.0;
        if (waccError) this.error.push(waccError);

        const { data: fetchedData, error: dataError } = await yFinanceQuery({ query: 'DISCOUNTED_FREE_CASH_FLOW', stock: this.stock });
        this.dataYFinance = fetchedData || undefined;
        if (dataError) this.error.push(dataError);
    }

    
    calculeGrowthRate(){
        const previousYears = new Map(this.dataPastYear.map(obj => [obj.year, obj.data.annualTotalRevenue]));
    
        this.dataPastYear.forEach(obj => {
            const previousRevenue = previousYears.get(obj.year - 1);
            if (previousRevenue && previousRevenue !== 0) {
                obj.data.growthRate = (obj.data.annualTotalRevenue - previousRevenue) / previousRevenue;
            }
        });
    }

    calculeAverage(property: string,calcFunction: (data: any) => number){
        const allData : number[] = []
        this.dataPastYear.map((obj) => {
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
        this.dataPastYear.forEach(obj => {
            if (obj.data[div] !== 0) {
                obj.data[property] = calcFunction(obj.data);
            }
        });
    }
    
    async calculeDataPastYear(){
        const pastYears = generateYears({dataYFinance: this.dataYFinance, type: 'PAST_YEARS'})
        if(!pastYears) throw new Error('Las fechas no se asignaron correctamente')
        
        pastYears.forEach(year => {
            this.dataPastYear.push(extractYFinanceData({ dataYFinance: this.dataYFinance, year }));
        });

        await this.calculeGrowthRate()
        await this.calculeAverage('growthRate', data => this.growthRateAverage = data );
        
        this.dataPastYear.map((obj) => {
            if(obj.data.growthRate===0) {
                obj.data.growthRate = this.growthRateAverage;
            }
        })
        this.calculateProperty('margins', 'annualTotalRevenue', data => data.annualNetIncome / data.annualTotalRevenue);
        this.calculateProperty('freeCashFlowDividedNetIncome', 'annualNetIncome', data => data.annualFreeCashFlow / data.annualNetIncome);
        this.calculeAverage('freeCashFlowDividedNetIncome', data => this.freeCashFlowDividedNetIncomeAverage = data );
        this.calculeAverage('margins', data => this.marginsAverege = data );
    }
} 