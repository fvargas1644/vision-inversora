'use server'

import { fetchWacc } from "../fetchWacc";
import { yFinanceQuery } from "../yfinance-js/fetchData";
import { buildFinancialData } from "./builderFinancialData";
import { FinancialModel } from "./FinancialModel";
import { validate } from "../validation/backend/discounted-free-cash-flow/validations";
import { extractYFinanceCompanyInfo } from "../utils";

interface GetFinancialData {
    ticker: string,
    initialWacc?: number,
    initialGrowth?: number
}

export default async function getFinancialData({ticker, initialWacc, initialGrowth} : GetFinancialData){
    
    const wacc = initialWacc ?? await getWacc(ticker);
    const growth = initialGrowth ?? 0.025;

    // Validación de datos
    await Promise.all([
        validate(wacc),
        validate(growth)
    ]);
    
    const [yFinanceFinancialData, yFinanceDataCompanyInfo] = await Promise.all([
        yFinanceQuery({ query: 'FINANCIAL_DATA', ticker }),
        yFinanceQuery({ query: 'COMPANY_INFO', ticker })
    ]);
    
    const {financialData, predictionsData} = buildFinancialData(yFinanceFinancialData);

    const {stockPrice, sharesOutstanding} = extractYFinanceCompanyInfo(yFinanceDataCompanyInfo);


    const financialModel = new FinancialModel(wacc, stockPrice, sharesOutstanding, financialData, predictionsData, growth);

    financialModel.calculateFinancialData();
    financialModel.calculatePredictionsData();

    return {
        financialData: financialModel.getFinancialData(),
        predictionsData: financialModel.getPredictionsData(),
        intrinsicPrice: financialModel.getIntrinsicPrice(),
        stockPrice,
        wacc,
        growth
    }
}

async function getWacc(ticker : string) {
    try{
        const wacc = await fetchWacc(ticker);
        return wacc;
    } catch(err){
        return 0.10
    }
}

