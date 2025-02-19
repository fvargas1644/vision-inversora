import { fetchCompanyConcepts } from "../sec-edgar/fetchData";

export default async function getFinancialData({ticker, cik} :{ticker : string, cik : number}){

    const companyConcepts = fetchCompanyConcepts(cik);
}