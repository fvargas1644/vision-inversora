'use server'

import { secEdgarCompanyTickers } from "@/lib/types/secEdgar";
import { fetchSecEdgarCompanyTickers } from "@/lib/sec-edgar/fetchData";

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