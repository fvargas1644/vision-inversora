import { GENERATE_YEARS_YFINANCE_DATA } from "../utils";
import { yFinanceQuery } from "../yfinance-js/fetchData";

export default async function  buildFinancialData({yFinanceData, companyConcepts, sharesOutstanding,ticker} : any) {
    const financialDataYears = GENERATE_YEARS_YFINANCE_DATA['FINANCIAL_DATA'](yFinanceData);

    if (!financialDataYears) throw new Error('Las fechas no se asignaron correctamente');

    const lastYearFinancialData : number = Math.max(...financialDataYears);
    const firstYearFinancialData : number = Math.min(...financialDataYears);

    const predictionsYears = GENERATE_YEARS_YFINANCE_DATA['PREDICTIONS'](lastYearFinancialData);
    if (!predictionsYears) throw new Error('Las fechas no se asignaron correctamente');

    const stockHistory = await yFinanceQuery({
        query: "HISTORY", 
        ticker, 
        start: getDateSeconds(firstYearFinancialData), 
        end: getDateSeconds(lastYearFinancialData), 
        interval: "1mo" 
    });

    extractFinancialData({yFinanceData, companyConcepts, sharesOutstanding, year: 2025});

}

function extractFinancialData({yFinanceData,companyConcepts, sharesOutstanding, year }: any) {
    const sharesVal =  extractcompanyConcepts({year, companyConcepts});
    const financialData = {
        year,
        data: {
            marketCap: 0,
            annualTotalRevenue: 0,
            growthRate: 0,
            margin: 0,
            annualNetIncome: 0,
            per: 0,
            shares: sharesVal ? sharesVal: sharesOutstanding,
            stockPrice: 0
        }
    };

    for (const financialRecord of yFinanceData) {
        if (financialRecord.annualNetIncome) {
            
            financialRecord.annualNetIncome.forEach(record => {
                const isYear = record.asOfDate.startsWith(String(year));
                if (isYear) financialData.data.annualNetIncome = record.reportedValue.raw
            });
        }

        if (financialRecord.annualTotalRevenue) {
            financialRecord.annualTotalRevenue.forEach(record => {
                const isYear = record.asOfDate.startsWith(String(year));

                if (isYear) financialData.data.annualTotalRevenue = record.reportedValue.raw
            });
        }
    };

    return financialData;
}

function extractcompanyConcepts({year, companyConcepts} : any) {
    for  (let i = companyConcepts.length - 1; i >= 0; i--) {
        if(companyConcepts[i].end.startsWith(String(year))){
            return companyConcepts[i].val
        }
    }
    return undefined;
}

function getDateSeconds(year : number) {
    const lastDayYear = new Date(year, 11, 31)
    const millisecondsDate = lastDayYear.getTime();
    const secondsDate = Math.floor(millisecondsDate / 1000);

    return secondsDate;
}