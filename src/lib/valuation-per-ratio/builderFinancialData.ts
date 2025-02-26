import { GENERATE_YEARS_YFINANCE_DATA } from "../utils";
import { yFinanceQuery } from "../yfinance-js/fetchData";

export default async function  buildFinancialData({yFinanceData, companyConcepts,ticker} : any) {

    const financialData= [];

    const financialDataYears = GENERATE_YEARS_YFINANCE_DATA['FINANCIAL_DATA'](yFinanceData);

    if (!financialDataYears) throw new Error('Las fechas no se asignaron correctamente');

    const lastYearFinancialData : number = Math.max(...financialDataYears);
    const firstYearFinancialData : number = Math.min(...financialDataYears);

    const predictionsYears = GENERATE_YEARS_YFINANCE_DATA['PREDICTIONS'](lastYearFinancialData);
    if (!predictionsYears) throw new Error('Las fechas no se asignaron correctamente');

    const stockHistory = await yFinanceQuery({
        query: "HISTORY", 
        ticker, 
        start: getDateSeconds(firstYearFinancialData -1), 
        end: getDateSeconds(lastYearFinancialData), 
        interval: "1mo" 
    });

    financialDataYears.forEach(year => {
        financialData.push(extractFinancialData({yFinanceData, companyConcepts, year, stockHistory}));
    });
    

}

function extractFinancialData({yFinanceData,companyConcepts, year , stockHistory}: any) {

    // extraer shares
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
            shares: sharesVal ? sharesVal: 0,
            stockPrice: 0
        }
    };

    // Extraer annualTotalRevenue y annualNetIncome
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

    // Extraer stockPrice
    for (let i = stockHistory[0].timestamp.length - 1; i >= 0; i--) {
        const historyYear = dateSecondsToDate(stockHistory[0].timestamp[i])
        if (historyYear === year) {
            financialData.data.stockPrice = stockHistory[0].indicators.adjclose[0].adjclose[i];
            break
        }
    };

    return financialData;

}

function dateSecondsToDate(dateSeconds : number) {
    const date = new Date(dateSeconds * 1000);
    return date.getFullYear();
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