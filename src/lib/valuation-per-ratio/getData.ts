import { fetchCompanyConcepts } from "../sec-edgar/fetchData";
import { yFinanceQuery } from "../yfinance-js/fetchData";

export default async function getFinancialData({ticker, cik} :{ticker : string, cik : number}){

    const companyConcepts = fetchCompanyConcepts(cik);

    const [yFinanceDataDiscountedFreeCashFlow, yFinanceDataCompanyInfo] = await Promise.all([
        yFinanceQuery({ query: 'DISCOUNTED_FREE_CASH_FLOW', ticker }),
        yFinanceQuery({ query: 'COMPANY_INFO', ticker })
    ]);
}