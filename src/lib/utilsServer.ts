'use server'

import { fetchSecEdgarCompanyTickers } from "@/lib/sec-edgar/fetchData";
import { queryYFinance } from "@/lib/yfinance-js/fetchData"
import { YFinanceChartResultHistory } from "@/lib/types/yfinance"
import { formatPrice } from "@/lib/utils"

export async function findCompany(ticker: string) {
    const fechCompany = await fetchSecEdgarCompanyTickers();
    for (const item of fechCompany.data) {
        if (item[2] === ticker) {
            return {
                cik: item[0],
                ticker,
                company: item[1]
            }
        }
    }
    return { ticker: null, company: null, cik: null }
}

async function calculateMarketShare(ticker : string)  {
    const query :YFinanceChartResultHistory[] = await queryYFinance({ticker , query: "HISTORY_BY_INTERVAL", interval: "1d", range: "1wk"})
    const values = query[0].indicators.quote[0]

    let change : string | number = ((values.close.at(-1)-values.open.at(-1))/values.close.at(-1))*100
    change = (change > 0) ?  `+${formatPrice(change)}%` : `${formatPrice(change)}%`
    
    return {value: formatPrice(values.close.at(-1)), change}
} 

export async function marketData() {
    return Promise.all([
        { name: "S&P 500", symbol: "^GSPC" },
        { name: "Dow Jones", symbol: "^DJI" },
        { name: "Nasdaq", symbol: "^IXIC" },
        { name: "Russell 2000", symbol: "^RUT" },
        { name: "Crude Oil", symbol: "CL=F" },
        { name: "Gold", symbol: "GC=F" },
        { name: "10-Yr Bond", symbol: "^TNX" }
    ].map(async (item) => ({
        name: item.name,
        ...await calculateMarketShare(item.symbol)
    })));
} 