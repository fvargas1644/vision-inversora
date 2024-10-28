import { fetchWacc } from "../fetchWacc";
import { yFinanceQuery } from "../yfinance-js/fetchData";
import buildFinancialData from "./builderFinancialData";

export default async function getFinancialData(stock : string){
    let  { wacc, error: waccError} = await fetchWacc(stock);
    const { data : yFinaceData, error : yFinaceDataError} = await  yFinanceQuery({ query: 'DISCOUNTED_FREE_CASH_FLOW', stock });

    if(!yFinaceData) throw new Error('No se encontraron los datos de Yahoo Finance');
    wacc = (!wacc) ? 0.0 : wacc 

    const financiaData = buildFinancialData(yFinaceData)

    console.log(financiaData)
    
}