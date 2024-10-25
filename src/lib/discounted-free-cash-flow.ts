import { DataDiscountedFreeCashFlow } from "./definitions";
import { getWacc } from "./getWacc";
import { yFinanceQuery } from "./yfinance-js/getData";

async function getData(){

    let data: DataDiscountedFreeCashFlow = {
        wacc: 0.0,
        dataYFinance: undefined, // O inicialízalo con un arreglo de AnnualData
        errors: []
    };

    const wacc = await getWacc()
    const dataYFinance  = await yFinanceQuery({query: 'DISCOUNTED_FREE_CASH_FLOW', stock: 'aaaaaa'})
    
    data = (wacc.wacc) ? { ...data, wacc: wacc.wacc, errors: []} : { ...data, wacc: 0.0, errors: [wacc.error]}

    data = (dataYFinance.data) ? 
        {...data, dataYFinance: dataYFinance.data} : 
        {...data, dataYFinance: undefined ,errors: [...data.errors, dataYFinance.error]}

    return data
}
