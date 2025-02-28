import { fetchSecEdgarCompanyConcepts } from "../sec-edgar/fetchData";
import { extractYFinanceCompanyInfo } from "../utils";
import { queryYFinance } from "../yfinance-js/fetchData";
import buildFinancialDataValuationPerRatio from "./builderFinancialData";
import { FinancialDataCalculator } from "./FinancialDataCalculator";

export default async function getDataValuationPerRatio({ticker, cik} :{ticker : string, cik : number}){

    const companyConcepts = await getCompanyConcepts(cik);

    const [yFinanceFinancialData, yFinanceDataCompanyInfo] = await Promise.all([
        queryYFinance({ query: 'FINANCIAL_DATA', ticker }),
        queryYFinance({ query: 'COMPANY_INFO', ticker })
    ]);

    const {stockPrice, sharesOutstanding} = extractYFinanceCompanyInfo(yFinanceDataCompanyInfo);

    const {financialData, predictionsData} = await buildFinancialDataValuationPerRatio({yFinanceFinancialData, companyConcepts, ticker});

    const financialModelValuationPerRatio = new FinancialDataCalculator( stockPrice, sharesOutstanding, financialData, predictionsData);

    financialModelValuationPerRatio.calculateFinancialData();

}

async function getCompanyConcepts(cik : number) {
    try{
        const companyConcepts = await fetchSecEdgarCompanyConcepts(cik);
        return companyConcepts;
    } catch(err){
        return []
    }
}