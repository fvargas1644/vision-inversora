
import { FinancialEntry, AssetProfileResult, PreviousYearsDataType, FutureYearsDataType } from "@/lib/definitions";

export const BUILD_FINANCIAL_DATA = {
    DISCOUNTED_FREE_CASH_FLOW: (yFinanceData: FinancialEntry[]) => {
        const previousYearsData: PreviousYearsDataType[] = [];
        const futureYearsData: FutureYearsDataType[] = [];
        const previousYears = GENERATE_DATA_CONTAINER['PREVIUS_YEARS'](yFinanceData);

        if (!previousYears) throw new Error('Las fechas no se asignaron correctamente');

        previousYears.forEach(year => {
            previousYearsData.push(extractYFinanceFinancialData({ yFinanceData, year }));
        });

        const lastYearPreviousData : number = Math.max(...previousYears);
        const futureYears = GENERATE_DATA_CONTAINER['FUTURE_YEARS'](lastYearPreviousData);
        if (!futureYears) throw new Error('Las fechas no se asignaron correctamente');

        futureYears.forEach(year => {
            futureYearsData.push(buildFutureYearData(year));
        });

        if (previousYearsData.length > 0 && futureYearsData.length > 0) {
            return {
                previousYearsData,
                futureYearsData,
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

const GENERATE_DATA_CONTAINER = {
    PREVIUS_YEARS: (yFinanceData: FinancialEntry[]) => {
        const years: number[] = []
        if (yFinanceData !== undefined && yFinanceData[0].timestamp) {
            const yearsWithoutParse = yFinanceData[0].timestamp.map(timestamp => new Date(timestamp * 1000))
            yearsWithoutParse.map(timestamp => years.push(Number(timestamp.getFullYear())))
        }
        return years;
    },

    FUTURE_YEARS: (lastYearPreviousData : number) => {
        const years = [];
        for (let i = 1; i < 11; i++) {
            // Calculamos el año correspondiente
            const year = lastYearPreviousData + i;
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
            console.log(financialRecord.annualFreeCashFlow)
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

function buildFutureYearData(year: number) {

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
