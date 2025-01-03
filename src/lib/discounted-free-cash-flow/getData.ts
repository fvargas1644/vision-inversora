'use server'

import { fetchWacc } from "../fetchWacc";
import { yFinanceQuery } from "../yfinance-js/fetchData";
import buildFinancialData from "./builderFinancialData";
import { RequestError } from "../Error";
import { FinancialData } from "./FinancialData";

interface GetFinancialData {
    stock: string,
    initialWacc?: number,
    initialGrowth?: number
}

export default async function getFinancialData({stock, initialWacc, initialGrowth} : GetFinancialData){
    
    const wacc = (initialWacc) ? initialWacc : await getWacc(stock);
    const growth =(initialGrowth) ? initialGrowth : await getWacc(stock);
    
    const yFinaceDataDiscountedFreeCashFlow = await getYFinanceData({ query: 'DISCOUNTED_FREE_CASH_FLOW', stock });
    const yFinanceDataCompanyInfo = await  getYFinanceData({ query: 'COMPANY_INFO', stock });
    
    const {previousYearsData, futureYearsData} = buildFinancialData({yFinanceData: yFinaceDataDiscountedFreeCashFlow, type: 'DISCOUNTED_FREE_CASH_FLOW'});
    const {stockPrice, sharesOutstanding} =  buildFinancialData({yFinanceData: yFinanceDataCompanyInfo, type: 'COMPANY_INFO'});

    const financialData = new FinancialData(wacc, stockPrice, sharesOutstanding, previousYearsData, futureYearsData);

    financialData.calculatePreviusYearsData();
    financialData.calculateFurureYearsData();

    return {
        previousYearsData: financialData.getPreviousYearsData(),
        futureYearsData: financialData.getFutureYearsData(),
        intrinsicPrice: financialData.getIntrinsicPrice(),
        stockPrice,
        wacc,
        growth,
    }
}

async function getWacc(stock : string) {
    try{
        const wacc = await fetchWacc(stock);
        return wacc;
    } catch(err){
        return 10
    }
}

interface GetYFinanceDataInterface {
    query: string,
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
