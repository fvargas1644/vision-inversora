import { DataDiscountedFreeCashFlow, YFinanceDiscountedFreeCashFlow } from "./definitions";
import { getWacc } from "./getWacc";
import { yFinanceQuery } from "./yfinance-js/getData";

async function getData(){

    let data: DataDiscountedFreeCashFlow = {
        wacc: 0.0,
        dataYFinance: undefined,
        errors: []
    };

    const wacc = await getWacc()
    const dataYFinance  = await yFinanceQuery({query: 'DISCOUNTED_FREE_CASH_FLOW', stock: 'AAPL'})
    
    data = (wacc.wacc) ? { ...data, wacc: wacc.wacc, errors: []} : { ...data, wacc: 0.0, errors: [wacc.error]}

    data = (dataYFinance.data) ? 
        {...data, dataYFinance: dataYFinance.data} : 
        {...data, dataYFinance: undefined ,errors: [...data.errors, dataYFinance.error]}

    return data
}

interface GenerateYears {
    dataYFinance?: (YFinanceDiscountedFreeCashFlow[] | undefined),
    type: string,
}

function generateYears({dataYFinance=undefined, type} : GenerateYears) {
    const  today = new Date();
    const  years : number[] = [];

    switch(type){   
        case 'FIRTS':
            if(dataYFinance !== undefined && dataYFinance[0].timestamp){
                const yearsWithoutParse = dataYFinance[0].timestamp.map(timestamp => new Date(timestamp * 1000))
                yearsWithoutParse.map(timestamp => years.push(Number(timestamp.getFullYear())))
                return years;
            } else {
                for (let i = 1; i < 5; i++) {
                    // Calculamos el año correspondiente
                    const year = today.getFullYear() - i;
                    years.unshift(Number(year));
                }
            
                return years;
            }
        case 'SECOND':
            for (let i = 0; i < 4; i++) {
                // Calculamos el año correspondiente
                const year = today.getFullYear() + i;
                years.push(Number(year));
            }

            return years;
    }
}
interface ExtractYFinanceData  {
    financialData?: (YFinanceDiscountedFreeCashFlow[] | undefined),
    year: number,
}

function extractYFinanceData({ financialData = undefined, year } : ExtractYFinanceData) {
    let extractedData = {
        year,
        annualNetIncome: 0, 
        annualFreeCashFlow: 0,
        annualTotalRevenue: 0
    };

    if (financialData !== undefined) {
        for (const financialRecord of financialData) {
            if (financialRecord.annualNetIncome) {
                financialRecord.annualNetIncome.forEach(record => {
                    const isYear = record.asOfDate.startsWith(String(year));

                    if (isYear) extractedData= {...extractedData, annualNetIncome: record.reportedValue.raw}
                });
            }

            if (financialRecord.annualFreeCashFlow) {
                financialRecord.annualFreeCashFlow.forEach(record => {
                    const isYear = record.asOfDate.startsWith(String(year));
                    
                    if (isYear) extractedData= {...extractedData, annualFreeCashFlow: record.reportedValue.raw}
                });
            }

            if (financialRecord.annualTotalRevenue) {
                financialRecord.annualTotalRevenue.forEach(record => {
                    const isYear = record.asOfDate.startsWith(String(year));
                    
                    if (isYear) extractedData= {...extractedData, annualTotalRevenue: record.reportedValue.raw}
                });
            }
        }

        return extractedData;
    } else {
        return extractedData;
    }
}

export async function rate() {
    const data : DataDiscountedFreeCashFlow = await getData()

    const firstYears = generateYears({dataYFinance:data.dataYFinance, type: 'FIRTS'})

    const extract = extractYFinanceData({financialData: data.dataYFinance, year: 2023})

    console.log(extract)
    
}