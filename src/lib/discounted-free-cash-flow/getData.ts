'use server'

import { fetchWacc } from "../fetchWacc";
import { yFinanceQuery } from "../yfinance-js/fetchData";
import { BUILD_FINANCIAL_DATA } from "./builderFinancialData";
import { RequestError } from "../Error";
import { FinancialData } from "./FinancialData";
import { validate } from "../validation/backend/discounted-free-cash-flow/validations";

interface GetFinancialData {
    stock: string,
    initialWacc?: number,
    initialGrowth?: number
}

export default async function getFinancialData({stock, initialWacc, initialGrowth} : GetFinancialData){
    
    const wacc = initialWacc ?? await getWacc(stock);
    const growth = initialGrowth ?? 0.025;

    // Validación de datos
    await Promise.all([
        validate(wacc),
        validate(growth)
    ]);
    
    
    
    const [yFinanceDataDiscountedFreeCashFlow, yFinanceDataCompanyInfo] = await Promise.all([
        getYFinanceData({ query: 'DISCOUNTED_FREE_CASH_FLOW', stock }),
        getYFinanceData({ query: 'COMPANY_INFO', stock })
    ]);
    
    const {previousYearsData, futureYearsData} = BUILD_FINANCIAL_DATA['DISCOUNTED_FREE_CASH_FLOW'](yFinanceDataDiscountedFreeCashFlow);

    const {stockPrice, sharesOutstanding} = BUILD_FINANCIAL_DATA['COMPANY_INFO'](yFinanceDataCompanyInfo);


    const financialData = new FinancialData(wacc, stockPrice, sharesOutstanding, previousYearsData, futureYearsData, growth);

    financialData.calculatePreviusYearsData();
    financialData.calculateFurureYearsData();

    return {
        previousYearsData: financialData.getPreviousYearsData(),
        futureYearsData: financialData.getFutureYearsData(),
        intrinsicPrice: financialData.getIntrinsicPrice(),
        stockPrice,
        wacc,
        growth
    }
}

async function getWacc(stock : string) {
    try{
        const wacc = await fetchWacc(stock);
        return wacc;
    } catch(err){
        return 0.10
    }
}

interface GetYFinanceDataInterface {
    query: 'DISCOUNTED_FREE_CASH_FLOW' | 'COMPANY_INFO',
    stock: string
}

async function getYFinanceData({query , stock } :GetYFinanceDataInterface) {
    try{
        const yFinanceData = await yFinanceQuery({ query, stock });
        return yFinanceData;
    } catch(err){
        throw new RequestError(String(err));
    }
}
