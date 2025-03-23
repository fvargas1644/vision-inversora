import { extractYFinanceCompanyInfo } from "../utils";
import { queryYFinance } from "../yfinance-js/fetchData";
import buildFinancialDataValuationPerRatio from "./builderFinancialData";
import { FinancialModel } from "./FinancialModel";

export default async function getDataValuationPerRatio({ticker} :{ticker : string}){

    const [yFinanceFinancialData, yFinanceDataCompanyInfo] = await Promise.all([
        queryYFinance({ query: 'FINANCIAL_DATA', ticker }),
        queryYFinance({ query: 'COMPANY_INFO', ticker })
    ]);

    const {stockPrice, sharesOutstanding, per} = extractYFinanceCompanyInfo(yFinanceDataCompanyInfo);

    const {financialData, predictionsData} = await buildFinancialDataValuationPerRatio({yFinanceFinancialData, ticker});

    const financialModelValuationPerRatio = new FinancialModel( stockPrice, sharesOutstanding, financialData, predictionsData, per);

    financialModelValuationPerRatio.calculateFinancialData();
    financialModelValuationPerRatio.calculatePredictionsData();

    return {
        financialData: financialModelValuationPerRatio.getFinancialData(),
        predictionsData: financialModelValuationPerRatio.getPredictionsData(),
        stockPrice,
    }

}
