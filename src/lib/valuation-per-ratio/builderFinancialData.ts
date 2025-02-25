import { GENERATE_YEARS_YFINANCE_DATA } from "../utils";

export default function  buildFinancialData({yFinanceData, companyConcepts, sharesOutstanding} : any) {
    const financialDataYears = GENERATE_YEARS_YFINANCE_DATA['FINANCIAL_DATA'](yFinanceData);

    if (!financialDataYears) throw new Error('Las fechas no se asignaron correctamente');

    const lastYearFinancialData : number = Math.max(...financialDataYears);
    const predictionsYears = GENERATE_YEARS_YFINANCE_DATA['PREDICTIONS'](lastYearFinancialData);
    if (!predictionsYears) throw new Error('Las fechas no se asignaron correctamente');

    extractFinancialData({yFinanceData, companyConcepts, sharesOutstanding, year: 2025})

}

function extractFinancialData({yFinanceData,companyConcepts, sharesOutstanding, year }: any) {
    const sharesVal =  extractcompanyConcepts({year, companyConcepts, sharesOutstanding});
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
    }
}

function extractcompanyConcepts({year, companyConcepts, sharesOutstanding} : any) {
    for  (let i = companyConcepts.length - 1; i >= 0; i--) {
        if(companyConcepts[i].end.startsWith(String(year))){
            return companyConcepts[i].val
        }
    }
    return undefined;
}