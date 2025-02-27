import { fetchCompanyConcepts } from "../sec-edgar/fetchData";
import { extractYFinanceCompanyInfo } from "../utils";
import { yFinanceQuery } from "../yfinance-js/fetchData";
import buildFinancialData from "./builderFinancialData";

export default async function getFinancialData({ticker, cik} :{ticker : string, cik : number}){

    const companyConcepts = await getCompanyConcepts(cik);

    const [yFinanceFinancialData, yFinanceDataCompanyInfo] = await Promise.all([
        yFinanceQuery({ query: 'FINANCIAL_DATA', ticker }),
        yFinanceQuery({ query: 'COMPANY_INFO', ticker })
    ]);

    const {stockPrice, sharesOutstanding} = extractYFinanceCompanyInfo(yFinanceDataCompanyInfo);

    buildFinancialData({yFinanceFinancialData, companyConcepts, ticker});

}

async function getCompanyConcepts(cik : number) {
    try{
        const companyConcepts = await fetchCompanyConcepts(cik);
        return companyConcepts;
    } catch(err){
        return []
    }
}