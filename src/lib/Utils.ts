
import { FinancialEntry } from "@/lib/definitions";

export function formatPrice(price: number): string {
    const sign = price < 0 ? '-' : ''; // Determina el signo del número
    const absolutePrice = Math.abs(price); // Obtiene el valor absoluto del número
  
    // Moneda en dolares $
    if (absolutePrice >= 1_000_000_000_000_000_000) { // Quintillón (Qi)
        return sign + (absolutePrice / 1_000_000_000_000_000_000).toFixed(3) + 'Qi';
    } else if (absolutePrice >= 1_000_000_000_000_000) { // Cuatrillón (Qa)
        return sign + (absolutePrice / 1_000_000_000_000_000).toFixed(3) + 'Qa';
    } else if (absolutePrice >= 1_000_000_000_000) { // Trillón (T)
        return sign + (absolutePrice / 1_000_000_000_000).toFixed(3) + 'T';
    } else if (absolutePrice >= 1_000_000_000) { // Billón (B)
        return sign + (absolutePrice / 1_000_000_000).toFixed(3) + 'B';
    } else if (absolutePrice >= 1_000_000) { // Millón (M)
        return sign + (absolutePrice / 1_000_000).toFixed(3) + 'M';
    } else if (absolutePrice >= 1_000){
      return sign  + absolutePrice.toLocaleString("us-US", {maximumFractionDigits: 0})
    } else {
      return sign + absolutePrice.toLocaleString("us-US", {maximumFractionDigits: 2})
    }
}

export function extractYFinanceCompanyInfo(yFinanceData: any[]) {
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

export const GENERATE_YEARS_YFINANCE_DATA = {
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

