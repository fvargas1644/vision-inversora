import { fetchWacc } from "../fetchWacc";
import { yFinanceQuery } from "../yfinance-js/fetchData";
import buildFinancialData from "./builderFinancialData";
import { RequestError } from "../error";


export default async function getFinancialData(stock : string){
    
    const wacc = await getWacc(stock)

    console.log(wacc)

    const yFinaceDataDiscountedFreeCashFlow = await getYFinanceData({ query: 'DISCOUNTED_FREE_CASH_FLOW', stock })
    

    const yFinanceDataCompanyInfo = await  getYFinanceData({ query: 'COMPANY_INFO', stock });
    
    const financialData = buildFinancialData({yFinanceData: yFinaceDataDiscountedFreeCashFlow, type: 'DISCOUNTED_FREE_CASH_FLOW'})
    const {sharesOutstanding, stockPrice} = buildFinancialData({yFinanceData: yFinanceDataCompanyInfo, type: 'COMPANY_INFO'})

}

async function getWacc(stock : string) {
    try{
        const wacc = await fetchWacc(stock);
        return wacc
    } catch(err){
        console.error(err)
        return 0.0
    }
}

interface GetYFinanceDataInterface {
    query: string,
    stock: string
}

async function getYFinanceData({query , stock } :GetYFinanceDataInterface) {
    try{
        const yFinanceData = await yFinanceQuery({ query, stock });
        return yFinanceData
    } catch(err){
        throw new RequestError(String(err))
    }
}
