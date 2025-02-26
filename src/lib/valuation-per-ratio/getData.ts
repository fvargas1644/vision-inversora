import { fetchCompanyConcepts } from "../sec-edgar/fetchData";
import { extractYFinanceCompanyInfo } from "../utils";
import { yFinanceQuery } from "../yfinance-js/fetchData";
import buildFinancialData from "./builderFinancialData";

export default async function getFinancialData({ticker, cik} :{ticker : string, cik : number}){

    const companyConcepts = await getCompanyConcepts(cik);

    const [yFinanceData, yFinanceDataCompanyInfo] = await Promise.all([
        yFinanceQuery({ query: 'DISCOUNTED_FREE_CASH_FLOW', ticker }),
        yFinanceQuery({ query: 'COMPANY_INFO', ticker })
    ]);

    const {stockPrice, sharesOutstanding} = extractYFinanceCompanyInfo(yFinanceDataCompanyInfo);

    buildFinancialData({yFinanceData, companyConcepts, ticker});

}

async function getCompanyConcepts(cik : number) {
    try{
        const companyConcepts = await fetchCompanyConcepts(cik);
        return companyConcepts;
    } catch(err){
        return []
    }
}