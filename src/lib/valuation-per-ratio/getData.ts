import { fetchCompanyConcepts } from "../sec-edgar/fetchData";
import { yFinanceQuery } from "../yfinance-js/fetchData";
import buildFinancialData from "./builderFinancialData";

export default async function getFinancialData({ticker, cik} :{ticker : string, cik : number}){

    const companyConcepts = await fetchCompanyConcepts(cik);

    const [yFinanceDataDiscountedFreeCashFlow, yFinanceDataCompanyInfo] = await Promise.all([
        yFinanceQuery({ query: 'DISCOUNTED_FREE_CASH_FLOW', ticker }),
        yFinanceQuery({ query: 'COMPANY_INFO', ticker })
    ]);

    buildFinancialData({yFinanceDataDiscountedFreeCashFlow, companyConcepts})
}