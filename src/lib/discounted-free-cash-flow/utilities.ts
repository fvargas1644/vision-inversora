import { YFinanceDiscountedFreeCashFlow } from "../definitions";

interface GenerateYears {
    dataYFinance?: (YFinanceDiscountedFreeCashFlow[] | undefined),
    type: string,
}

export function generateYears({dataYFinance=undefined, type} : GenerateYears){ 
    const  today = new Date();
    const  years : number[] = [];

    switch(type){   
        case 'PAST_YEARS':
            if(dataYFinance !== undefined && dataYFinance[0].timestamp){
                const yearsWithoutParse = dataYFinance[0].timestamp.map(timestamp => new Date(timestamp * 1000))
                yearsWithoutParse.map(timestamp => years.push(Number(timestamp.getFullYear())))
            } else {
                for (let i = 1; i < 5; i++) {
                    // Calculamos el año correspondiente
                    const year = today.getFullYear() - i;
                    years.unshift(Number(year));
                }
            }

            return years;
        case 'FUTURE_YEARS':
            for (let i = 0; i < 4; i++) {
                // Calculamos el año correspondiente
                const year = today.getFullYear() + i;
                years.push(Number(year));
            }
            return years;
    }
}
interface ExtractYFinanceData  {
    dataYFinance?: (YFinanceDiscountedFreeCashFlow[] | undefined),
    year: number,
}

export function extractYFinanceData({ dataYFinance = undefined, year } : ExtractYFinanceData) {
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

    if (dataYFinance !== undefined) {
        for (const financialRecord of dataYFinance) {
            if (financialRecord.annualNetIncome) {
                financialRecord.annualNetIncome.forEach(record => {
                    const isYear = record.asOfDate.startsWith(String(year));

                    if (isYear) extractedData.data.annualNetIncome = record.reportedValue.raw
                });
            }

            if (financialRecord.annualFreeCashFlow) {
                financialRecord.annualFreeCashFlow.forEach(record => {
                    const isYear = record.asOfDate.startsWith(String(year));
                    
                    if (isYear) extractedData.data.annualFreeCashFlow = record.reportedValue.raw
                });
            }

            if (financialRecord.annualTotalRevenue) {
                financialRecord.annualTotalRevenue.forEach(record => {
                    const isYear = record.asOfDate.startsWith(String(year));
                    
                    if (isYear) extractedData.data.annualTotalRevenue = record.reportedValue.raw
                });
            }
        }

        return extractedData;
    } else {
        return extractedData;
    }
}
