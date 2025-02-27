import { fetchCompanyConcepts } from "@/lib/sec-edgar/fetchData";
import { findCompany } from "@/lib/utilsServer";
import getDataValuationPerRatio from "@/lib/valuation-per-ratio/getData";

export default async function Page({ params }: { params: { ticker: string } }) {

    const {cik} = await findCompany(params.ticker);

    if(cik) {
        const data = await getDataValuationPerRatio({ticker: params.ticker, cik});
        return (
            <h1>Pruebas2</h1>
        )
    } 
    
}