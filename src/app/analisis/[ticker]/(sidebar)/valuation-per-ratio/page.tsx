import { fetchCompanyConcepts } from "@/lib/sec-edgar/fetchData";
import { findCompany } from "@/lib/utilsServer";
import getFinancialData from "@/lib/valuation-per-ratio/getData";

export default async function Page({ params }: { params: { ticker: string } }) {

    const {cik} = await findCompany(params.ticker);

    if(cik) {
        const data = await getFinancialData({ticker: params.ticker, cik});
        return (
            <h1>Pruebas2</h1>
        )
    } 
    
}