
import { ValuationPerRatioFinancialData, ValuatioPerRatioExtractFinancialData } from "../types/valuationPerRatio";
import { YFinanceFinancialData } from "../types/yfinance";

import { GENERATE_YEARS_YFINANCE_DATA } from "../utils";
import { queryYFinance  } from "../yfinance-js/fetchData";

export default async function  buildFinancialDataValuationPerRatio({yFinanceFinancialData,ticker} : {yFinanceFinancialData: YFinanceFinancialData[], ticker: string}) {

    const financialData : ValuationPerRatioFinancialData[]= [];
    const predictionsData : ValuationPerRatioFinancialData[] = [];

    const financialDataYears = GENERATE_YEARS_YFINANCE_DATA['FINANCIAL_DATA'](yFinanceFinancialData);
    

    if (!financialDataYears) throw new Error('Las fechas no se asignaron correctamente');

    const lastYearFinancialData : number = Math.max(...financialDataYears);
    const firstYearFinancialData : number = Math.min(...financialDataYears);

    const predictionsYears = GENERATE_YEARS_YFINANCE_DATA['PREDICTIONS'](lastYearFinancialData);
    if (!predictionsYears) throw new Error('Las fechas no se asignaron correctamente');

    const stockHistory = await queryYFinance({
        query: "HISTORY_BY_DATE", 
        ticker, 
        start: getDateSeconds(firstYearFinancialData -1), 
        end: getDateSeconds(lastYearFinancialData), 
        interval: "1mo" 
    });


    financialDataYears.forEach(year => {
        financialData.push(extractFinancialData({yFinanceFinancialData, year, stockHistory}));
    });
    
    predictionsYears.forEach(year => {
        predictionsData.push(buildFinancialDataContainer(year));
    });

    if (financialData.length > 0 && predictionsData.length > 0) {
        return {
            financialData,
            predictionsData,
        }
    } else {
        throw new Error('Error en decodificar los datos')
    }

}

function extractFinancialData({yFinanceFinancialData, year , stockHistory}: ValuatioPerRatioExtractFinancialData) {



    const financialData = buildFinancialDataContainer(year);

    // Extraer annualTotalRevenue y annualNetIncome
    for (const financialRecord of yFinanceFinancialData) {
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


function getDateSeconds(year : number) {
    const lastDayYear = new Date(year, 11, 31)
    const millisecondsDate = lastDayYear.getTime();
    const secondsDate = Math.floor(millisecondsDate / 1000);

    return secondsDate;
}

function buildFinancialDataContainer(year: number) {

    const financialData = {
        year,
        data: {
            annualTotalRevenue: 0,
            revenueGrowth: 0,
            margin: 0,
            annualNetIncome: 0,
            per: 0,
            stockPrice: 0
        }
    };

    return financialData;
}
