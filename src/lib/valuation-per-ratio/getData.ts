import { fetchSecEdgarCompanyConcepts } from "../sec-edgar/fetchData";
import { extractYFinanceCompanyInfo } from "../utils";
import { queryYFinance } from "../yfinance-js/fetchData";
import buildFinancialDataValuationPerRatio from "./builderFinancialData";

export default async function getDataValuationPerRatio({ticker, cik} :{ticker : string, cik : number}){

    const companyConcepts = await getCompanyConcepts(cik);

    const [yFinanceFinancialData, yFinanceDataCompanyInfo] = await Promise.all([
        queryYFinance({ query: 'FINANCIAL_DATA', ticker }),
        queryYFinance({ query: 'COMPANY_INFO', ticker })
    ]);

    const {stockPrice, sharesOutstanding} = extractYFinanceCompanyInfo(yFinanceDataCompanyInfo);

    buildFinancialDataValuationPerRatio({yFinanceFinancialData, companyConcepts, ticker});

}

async function getCompanyConcepts(cik : number) {
    try{
        const companyConcepts = await fetchSecEdgarCompanyConcepts(cik);
        return companyConcepts;
    } catch(err){
        return []
    }
}