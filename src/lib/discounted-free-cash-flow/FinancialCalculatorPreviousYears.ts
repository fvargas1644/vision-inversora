import { PreviousYearsDataType, FutureYearsDataType } from "./definitions";

export class FinancialCalculatorPreviousYears {
    protected wacc : number;
    protected stockPrice : number;
    protected sharesOutstanding : number;
    protected previousYearsData: PreviousYearsDataType[];
    protected futureYearsData: FutureYearsDataType[];
    protected growthRateAverage: number;
    protected freeCashFlowDividedNetIncomeAverage: number;
    protected marginsAverage: number;

    constructor(
        wacc : number, 
        stockPrice : number, 
        sharesOutstanding : number, 
        previousYearsData : PreviousYearsDataType[], 
        futureYearsData: FutureYearsDataType[]) {
            
        this.wacc = wacc;
        this.stockPrice = stockPrice;
        this.sharesOutstanding = sharesOutstanding;
        this.previousYearsData =previousYearsData;
        this.futureYearsData = futureYearsData;
        this.growthRateAverage = 0;
        this.freeCashFlowDividedNetIncomeAverage = 0;
        this.marginsAverage = 0;
    }

    private calculateGrowthRate(){
        const previousYears = new Map(this.previousYearsData.map(obj => [obj.year, obj.data.annualTotalRevenue]));
    
        this.previousYearsData.forEach(obj => {
            const previousRevenue = previousYears.get(obj.year - 1);
            if (previousRevenue && previousRevenue !== 0) {
                obj.data.growthRate = (obj.data.annualTotalRevenue - previousRevenue) / previousRevenue;
            }
        });
    }

    private calculateAverage(property: string): number {
        const relevantData = this.previousYearsData.map(obj => obj.data[property]).filter(value => value !== 0);
        return relevantData.length > 0 ? relevantData.reduce((acc, num) => acc + num, 0) / relevantData.length : 0;
    }

    private calculateProperty(property: string, div: string,calcFunction: (data: any) => number) {
        this.previousYearsData.forEach(obj => {
            if (obj.data[div] !== 0) {
                obj.data[property] = calcFunction(obj.data);
            }
        });
    }

    calculatePreviusYearsData(){
        this.calculateGrowthRate()
        this.growthRateAverage = this.calculateAverage('growthRate');
        
        this.previousYearsData.map((obj) => {
            if(obj.data.growthRate===0) {
                obj.data.growthRate = this.growthRateAverage;
            }
        })
        
        this.calculateProperty('margins', 'annualTotalRevenue', data => data.annualNetIncome / data.annualTotalRevenue);
        this.calculateProperty('freeCashFlowDividedNetIncome', 'annualNetIncome', data => data.annualFreeCashFlow / data.annualNetIncome);
        this.freeCashFlowDividedNetIncomeAverage = this.calculateAverage('freeCashFlowDividedNetIncome');
        this.marginsAverage = this.calculateAverage('margins');
    }

}