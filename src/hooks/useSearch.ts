import { fetchCompanyTickersExchange } from "@/lib/sec-edgar/fetchData";
import { CompanyTicker, FetchCompanyTickersExchangeResponse } from "@/lib/sec-edgar/definitions";

export default async function useSearch(stock: string): Promise<CompanyTicker[]> {
    const fetch: FetchCompanyTickersExchangeResponse = await fetchCompanyTickersExchange()
    let resultArr = []

    for (let arr of fetch.data) {
        if (arr[2].toLowerCase().includes(stock.toLowerCase()) || arr[1].toLowerCase().includes(stock.toLowerCase())) {
            resultArr.push(arr)
        }

        if (resultArr.length > 10) break
    }
    return resultArr;
}