
import { FinancialEntry, FinancialData, PredictionsData } from "@/lib/definitions";
import { GENERATE_YEARS_YFINANCE_DATA } from "../utils";

export function buildFinancialData(yFinanceFinancialData: FinancialEntry[]) {
        const financialData: FinancialData[] = [];
        const predictionsData: PredictionsData[] = [];
        const financialDataYears = GENERATE_YEARS_YFINANCE_DATA['FINANCIAL_DATA'](yFinanceFinancialData);

        if (!financialDataYears) throw new Error('Las fechas no se asignaron correctamente');

        financialDataYears.forEach(year => {
            financialData.push(extractYFinanceFinancialData({ yFinanceFinancialData, year }));
        });

        const lastYearFinancialData : number = Math.max(...financialDataYears);
        const predictionsYears = GENERATE_YEARS_YFINANCE_DATA['PREDICTIONS'](lastYearFinancialData);
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
}


interface ExtractYFinanceData {
    yFinanceFinancialData: FinancialEntry[],
    year: number,
}

function extractYFinanceFinancialData({ yFinanceFinancialData, year }: ExtractYFinanceData) {
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
    for (const financialRecord of yFinanceFinancialData) {
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

