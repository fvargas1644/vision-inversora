import { DataDiscountedFreeCashFlow, YFinanceDiscountedFreeCashFlow } from "./definitions";
import { getWacc } from "./getWacc";
import { yFinanceQuery } from "./yfinance-js/getData";

async function getData(){

    let data: DataDiscountedFreeCashFlow = {
        wacc: 0.0,
        dataYFinance: undefined, // O inicialízalo con un arreglo de AnnualData
        errors: []
    };

    const wacc = await getWacc()
    const dataYFinance  = await yFinanceQuery({query: 'DISCOUNTED_FREE_CASH_FLOW', stock: 'AAPL'})
    
    data = (wacc.wacc) ? { ...data, wacc: wacc.wacc, errors: []} : { ...data, wacc: 0.0, errors: [wacc.error]}

    data = (dataYFinance.data) ? 
        {...data, dataYFinance: dataYFinance.data} : 
        {...data, dataYFinance: undefined ,errors: [...data.errors, dataYFinance.error]}

    return data
}

function generateYears(dataYFinance : (YFinanceDiscountedFreeCashFlow[] | undefined)) {
    const  today = new Date();
    const  years : number[] = [];

    if(dataYFinance !== undefined && dataYFinance[0].timestamp){
        const yearsWithoutParse = dataYFinance[0].timestamp.map(timestamp => new Date(timestamp * 1000))
        yearsWithoutParse.map(timestamp => years.unshift(Number(timestamp.getFullYear())))

        return years;
    } else {
        for (let i = 1; i < 5; i++) {
            // Calculamos el año correspondiente
            const year = today.getFullYear() - i;
            years.push(Number(year));
        }
    
        return years;
    }
    
}


export async function rate() {
    const data : DataDiscountedFreeCashFlow = await getData()

    const eviewDates = generateYears(data.dataYFinance)
    console.log(eviewDates)

    
}