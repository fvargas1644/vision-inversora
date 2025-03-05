import { ValuationPerRatioFinancialData } from "../types/valuationPerRatio";

export class FinancialDataCalculator {
    protected stockPrice : number;
    protected sharesOutstanding : number;
    protected financialData: ValuationPerRatioFinancialData[];
    protected predictionsData: ValuationPerRatioFinancialData[];
    protected growthRateAverage : number; 
    protected marginsAverage : number;
    protected per : number;
    protected sharesAverage : number;

    constructor(
        stockPrice : number, 
        sharesOutstanding : number, 
        financialData : ValuationPerRatioFinancialData[], 
        predictionsData: ValuationPerRatioFinancialData[],
        per: number) {
            
        this.stockPrice = stockPrice;
        this.sharesOutstanding = sharesOutstanding;
        this.financialData =financialData;
        this.predictionsData = predictionsData;
        this.growthRateAverage = 0;
        this.marginsAverage = 0;
        this.per = per;
        this.sharesAverage = 0;
    }

    private calculateProperty(
        property: 'margin' , 
        div: 'annualTotalRevenue',
        calcFunction: (data: any) => number
    )  {
        this.financialData.forEach(obj => {
            if (obj.data[div] !== 0) {
                obj.data[property] = calcFunction(obj.data);
            }
        });
    }

    private calculateAverage(
        property:  'revenueGrowth' | 'margin' | 'per' | 'shares'
    ) {
        const relevantData = this.financialData.map(obj => obj.data[property]).filter(value => value !== 0);
        return relevantData.length > 0 ? relevantData.reduce((acc, num) => acc + num, 0) / relevantData.length : 0;
    }


    private addDefaultValue(property: 'shares' | 'stockPrice', defaultValue: number) {
        const lastYear = Math.max(...this.financialData.map(obj => obj.year));

        // Agregar valor por defecto al ultimo año de financial data si no es 0
        this.financialData.forEach(obj => {
            if (lastYear === obj.year && obj.data[property] === 0) {
                obj.data[property] = defaultValue;
            }   
        });

        // Reordenar de mayor a menor
        this.financialData.sort((a, b) => b.year - a.year);

        for (let i = 1; i < this.financialData.length; i++) {
            if (this.financialData[i].data[property] === 0) {
                // Si el valor es 0, lo reemplazamos con el valor a su derecha
                this.financialData[i].data[property] = this.financialData[i - 1].data[property];
            }
        }

    }

    private calculateGrowthRate(){
        const years = new Map(this.financialData.map(obj => [obj.year, obj.data.annualTotalRevenue]));
    
        this.financialData.forEach(obj => {
            const previousRevenue = years.get(obj.year - 1);
            if (previousRevenue && previousRevenue !== 0) {
                obj.data.revenueGrowth = (obj.data.annualTotalRevenue - previousRevenue) / previousRevenue;
            }
        });

        // Calcular promedio de revenueGrowth
        this.growthRateAverage = this.calculateAverage('revenueGrowth');

        this.financialData.map((obj) => {
            if(obj.data.revenueGrowth===0) {
                obj.data.revenueGrowth = this.growthRateAverage;
            }
        });
    }

    calculateFinancialData(){

        this.calculateProperty('margin', 'annualTotalRevenue', data => data.annualNetIncome / data.annualTotalRevenue);
        this.addDefaultValue('shares', this.sharesOutstanding);
        this.addDefaultValue('stockPrice', this.stockPrice);

        this.financialData.forEach(obj => {
            obj.data.marketCap = obj.data.stockPrice * obj.data.shares;
            obj.data.per = this.per;
            
        });

        this.calculateGrowthRate();

        // calcular promedios
        this.marginsAverage = this.calculateAverage('margin');
        this.sharesAverage = this.calculateAverage('shares');
    }
}