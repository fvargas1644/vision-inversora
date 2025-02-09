
import { FinancialEntry, AssetProfileResult, FinancialData, PredictionsData } from "@/lib/definitions";

export const BUILD_FINANCIAL_DATA = {
    DISCOUNTED_FREE_CASH_FLOW: (yFinanceData: FinancialEntry[]) => {
        const financialData: FinancialData[] = [];
        const predictionsData: PredictionsData[] = [];
        const financialDataYears = GENERATE_YEARS['FINANCIAL_DATA'](yFinanceData);

        if (!financialDataYears) throw new Error('Las fechas no se asignaron correctamente');

        financialDataYears.forEach(year => {
            financialData.push(extractYFinanceFinancialData({ yFinanceData, year }));
        });

        const lastYearFinancialData : number = Math.max(...financialDataYears);
        const predictionsYears = GENERATE_YEARS['PREDICTIONS'](lastYearFinancialData);
        if (!predictionsYears) throw new Error('Las fechas no se asignaron correctamente');

        predictionsYears.forEach(year => {
            predictionsData.push(buildPredictionContainer(year));
        });

        if (financialData.length > 0 && predictionsData.length > 0) {
            return {
                financialData,
                predictionsData,
            }
        } else {
            throw new Error('Error en decodificar los datos')
        }
    },

    COMPANY_INFO: (yFinanceData: AssetProfileResult[]) => {
        const { sharesOutstanding, stockPrice } = extractYFinanceCompanyInfo(yFinanceData)
        return { sharesOutstanding, stockPrice }
    }
}

const GENERATE_YEARS = {
    FINANCIAL_DATA: (yFinanceData: FinancialEntry[]) => {
        const years: number[] = []
        if (yFinanceData !== undefined && yFinanceData[0].timestamp) {
            const yearsWithoutParse = yFinanceData[0].timestamp.map(timestamp => new Date(timestamp * 1000))
            yearsWithoutParse.map(timestamp => years.push(Number(timestamp.getFullYear())))
        }
        return years;
    },

    PREDICTIONS: (lastYearFinancialData : number) => {
        const years = [];
        for (let i = 1; i < 11; i++) {
            // Calcular el año correspondiente
            const year = lastYearFinancialData + i;
            years.push(Number(year));
        }
        return years;
    }
}


interface ExtractYFinanceData {
    yFinanceData: FinancialEntry[],
    year: number,
}

function extractYFinanceFinancialData({ yFinanceData, year }: ExtractYFinanceData) {
    const financialData = {
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

                if (isYear) financialData.data.annualNetIncome = record.reportedValue.raw
            });
        }

        if (financialRecord.annualFreeCashFlow) {
            financialRecord.annualFreeCashFlow.forEach(record => {
                const isYear = record.asOfDate.startsWith(String(year));

                if (isYear) financialData.data.annualFreeCashFlow = record.reportedValue.raw
            });
        }

        if (financialRecord.annualTotalRevenue) {
            financialRecord.annualTotalRevenue.forEach(record => {
                const isYear = record.asOfDate.startsWith(String(year));

                if (isYear) financialData.data.annualTotalRevenue = record.reportedValue.raw
            });
        }
    }

    return financialData;
}

function buildPredictionContainer(year: number) {

    const predictionsData = {
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

    return predictionsData;
}

function extractYFinanceCompanyInfo(yFinanceData: any[]) {
    let stockPrice = 0;
    let sharesOutstanding = 0
    for (const obj of yFinanceData) {
        if (obj.defaultKeyStatistics) {
            sharesOutstanding = obj.defaultKeyStatistics.sharesOutstanding
        }

        if (obj.financialData) {
            stockPrice = obj.financialData.currentPrice
        }
    }

    return { sharesOutstanding, stockPrice }
}
