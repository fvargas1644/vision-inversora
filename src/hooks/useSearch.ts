import { fetchCompanyTickersExchange } from "@/lib/sec-edgar/fetchData"

export default async function useSearch(stock : string){
    const fetch = await fetchCompanyTickersExchange()
    let resultArr = []

    for (let arr of fetch.data) {
        if(arr[2].toLowerCase().includes(stock.toLowerCase()) || arr[1].toLowerCase().includes(stock.toLowerCase())) {
            resultArr.push(arr)
        }

        if(arr[2].toLowerCase() === stock.toLowerCase()){
            resultArr = [arr]
            break;
        }
    }
    return resultArr;
}