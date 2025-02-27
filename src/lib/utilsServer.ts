'use server'

import { SecEdgarFetchCompanyTickersExchangeResponse } from "@/lib/types/secEdgar";
import { fetchCompanyTickersExchange } from "@/lib/sec-edgar/fetchData";

export async function findCompany(ticker: string) {
    const fechCompany: SecEdgarFetchCompanyTickersExchangeResponse = await fetchCompanyTickersExchange();
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