'use client'

import { fetchCompanyTickersExchange } from "@/lib/sec-edgar/fetchData"

export default async function useSearch(stock : string){
    const fetch = await fetchCompanyTickersExchange()
    fetch.data.map((arr) =>{
        /**Si hay una concidencia exacta dejar solo ese valor */
        if(arr[2].toLowerCase().includes(stock.toLowerCase()) || arr[1].toLowerCase().includes(stock.toLowerCase())) {
            //console.log(arr)
        }
    })
}