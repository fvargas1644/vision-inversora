'use server'

import { secEdgarCompanyTickers } from "@/lib/types/secEdgar";
import { fetchSecEdgarCompanyTickers } from "@/lib/sec-edgar/fetchData";
import { queryYFinance } from "@/lib/yfinance-js/fetchData"
import { YFinanceChartResultHistory } from "@/lib/types/yfinance"
import { formatPrice } from "@/lib/utils"

export async function findCompany(ticker: string) {
    const fechCompany: secEdgarCompanyTickers = await fetchSecEdgarCompanyTickers();
    for (let item of fechCompany.data) {
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

const calculeMarketShare = async (ticker : string) => {
    const query :YFinanceChartResultHistory[] = await queryYFinance({ticker , query: "HISTORY_BY_INTERVAL", interval: "1d"})
    const values = query[0].indicators.quote[0]

    let change : string | number = ((values.close[0]-values.open[0])/values.open[0])*100
    change = (change > 0) ?  `+${formatPrice(change)}%` : `${formatPrice(change)}%`
    
    return {value: formatPrice(values.close[0]), change}
} 

export async function marketData() {

  return [
    { name: "S&P 500", ...await  calculeMarketShare("^GSPC")},
    { name: "Dow Jones", ...await  calculeMarketShare("^DJI")},
    { name: "Nasdaq", ...await  calculeMarketShare("^IXIC") },
    { name: "Russell 2000",...await  calculeMarketShare("^RUT") },
    { name: "Crude Oil", ...await  calculeMarketShare("CL=F")},
    { name: "Gold", ...await  calculeMarketShare("GC=F") },
    { name: "10-Yr Bond", ...await  calculeMarketShare("^TNX")},
  ]
} 