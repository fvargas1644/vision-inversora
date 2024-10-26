import { FinancialPast } from "./FinancialPast";

export class FinancialFuture extends FinancialPast{
    constructor (stock: string){
        super(stock)
    }

    calculeRevenue(year : number){
        const extractedData = {
            year,
            data: {
                annualNetIncome: 0, 
                annualFreeCashFlow: 0,
                annualTotalRevenue: 0,
                growthRate: 0,
                margins: 0,
                freeCashFlowDividedNetIncome: 0
            }
            
        };
        
    }

    async calculeDataFurureYear(){
        
    }
}