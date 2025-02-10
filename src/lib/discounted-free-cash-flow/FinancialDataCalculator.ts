import { FinancialData, PredictionsData } from "@/lib/definitions";

export class FinancialDataCalculator {
    protected wacc : number;
    protected stockPrice : number;
    protected sharesOutstanding : number;
    protected financialData: FinancialData[];
    protected predictionsData: PredictionsData[];
    protected growthRateAverage: number;
    protected freeCashFlowDividedNetIncomeAverage: number;
    protected marginsAverage: number;

    constructor(
        wacc : number, 
        stockPrice : number, 
        sharesOutstanding : number, 
        financialData : FinancialData[], 
        predictionsData: PredictionsData[]) {
            
        this.wacc = wacc;
        this.stockPrice = stockPrice;
        this.sharesOutstanding = sharesOutstanding;
        this.financialData =financialData;
        this.predictionsData = predictionsData;
        this.growthRateAverage = 0;
        this.freeCashFlowDividedNetIncomeAverage = 0;
        this.marginsAverage = 0;
    }

    private calculateGrowthRate(){
        const financialDataYears = new Map(this.financialData.map(obj => [obj.year, obj.data.annualTotalRevenue]));
    
        this.financialData.forEach(obj => {
            const previousRevenue = financialDataYears.get(obj.year - 1);
            if (previousRevenue && previousRevenue !== 0) {
                obj.data.growthRate = (obj.data.annualTotalRevenue - previousRevenue) / previousRevenue;
            }
        });
    }

    private calculateAverage(
        property: 'growthRate' | 'freeCashFlowDividedNetIncome' | 'margins'
    ) {
        const relevantData = this.financialData.map(obj => obj.data[property]).filter(value => value !== 0);
        return relevantData.length > 0 ? relevantData.reduce((acc, num) => acc + num, 0) / relevantData.length : 0;
    }

    

    private calculateProperty(
        property: 'margins' | 'freeCashFlowDividedNetIncome',
        div: 'annualTotalRevenue' | 'annualNetIncome',
        calcFunction: (data: any) => number
    )  {
        this.financialData.forEach(obj => {
            if (obj.data[div] !== 0) {
                obj.data[property] = calcFunction(obj.data);
            }
        });
    }

    calculateFinancialData(){
        this.calculateGrowthRate()
        this.growthRateAverage = this.calculateAverage('growthRate');
        
        this.financialData.map((obj) => {
            if(obj.data.growthRate===0) {
                obj.data.growthRate = this.growthRateAverage;
            }
        })
        
        this.calculateProperty('margins', 'annualTotalRevenue', data => data.annualNetIncome / data.annualTotalRevenue);
        this.calculateProperty('freeCashFlowDividedNetIncome', 'annualNetIncome', data => data.annualFreeCashFlow / data.annualNetIncome);
        this.freeCashFlowDividedNetIncomeAverage = this.calculateAverage('freeCashFlowDividedNetIncome') > 0? this.calculateAverage('freeCashFlowDividedNetIncome') : 1 ;
        this.marginsAverage = this.calculateAverage('margins');
    }

}