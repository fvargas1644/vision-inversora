
import { YFinanceData, PreviusYearDataType, FutureYearDataType } from "./definitions";

interface GenerateYears {
    yFinanceData?: YFinanceData[],
    type: string,
}

export default function buildFinancialData(yFinanceData : YFinanceData[]){
    const previousYearsData : PreviusYearDataType[] = [];
    const futureYearsData : FutureYearDataType[]= [];
    const previousYears = generateYears({yFinanceData, type: 'PREVIUS_YEARS'})
    if(!previousYears) throw new Error('Las fechas no se asignaron correctamente')
        
    previousYears.forEach(year => {
        previousYearsData.push(extractYFinanceDataPreviusYear({ yFinanceData, year }));
    });


    const futureYears = generateYears({ type: 'FUTURE_YEARS'})
    if(!futureYears) throw new Error('Las fechas no se asignaron correctamente')

    futureYears.forEach(year => {
        futureYearsData.push(buildFutureYearData(year));
    });

    if(previousYearsData.length > 0 && futureYearsData.length > 0){
        return {
            previousYearsData,
            futureYearsData,
        }
    } else {
        throw new Error('Error en decodificar los datos')
    }      
} 

function generateYears({yFinanceData, type} : GenerateYears){ 
    const  today = new Date();
    const  years : number[] = [];

    switch(type){   
        case 'PREVIUS_YEARS':
            if(yFinanceData != undefined && yFinanceData[0].timestamp){
                const yearsWithoutParse = yFinanceData[0].timestamp.map(timestamp => new Date(timestamp * 1000))
                yearsWithoutParse.map(timestamp => years.push(Number(timestamp.getFullYear())))
            } 

            break;
        case 'FUTURE_YEARS':
            for (let i = 0; i < 6; i++) {
                // Calculamos el año correspondiente
                const year = today.getFullYear() + i;
                years.push(Number(year));
            }
            break;
    }
    return years;

}
interface ExtractYFinanceData  {
    yFinanceData: YFinanceData[] ,
    year: number,
}

function extractYFinanceDataPreviusYear({ yFinanceData, year } : ExtractYFinanceData) {
    const previusYearData = {
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

        for (const financialRecord of yFinanceData) {
            if (financialRecord.annualNetIncome) {
                financialRecord.annualNetIncome.forEach(record => {
                    const isYear = record.asOfDate.startsWith(String(year));

                    if (isYear) previusYearData.data.annualNetIncome = record.reportedValue.raw
                });
            }

            if (financialRecord.annualFreeCashFlow) {
                financialRecord.annualFreeCashFlow.forEach(record => {
                    const isYear = record.asOfDate.startsWith(String(year));
                    
                    if (isYear) previusYearData.data.annualFreeCashFlow = record.reportedValue.raw
                });
            }

            if (financialRecord.annualTotalRevenue) {
                financialRecord.annualTotalRevenue.forEach(record => {
                    const isYear = record.asOfDate.startsWith(String(year));
                    
                    if (isYear) previusYearData.data.annualTotalRevenue = record.reportedValue.raw
                });
            }
        }

        return previusYearData;
}

function buildFutureYearData(year : number){

    const futureYearData = {
        year,    
        data: {
            annualNetIncome: 0, 
            annualFreeCashFlow: 0,
            annualTotalRevenue: 0,
            discountFactor: 0,
            pv: 0,
            growthRate: 0,
            margins: 0,
            freeCashFlowDividedNetIncome: 0
        }
    };

    return futureYearData
}
