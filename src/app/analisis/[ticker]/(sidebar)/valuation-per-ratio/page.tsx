import { fetchCompanyConcepts } from "@/lib/sec-edgar/fetchData";
import { findCompany } from "@/lib/utilsServer";

export default async function Page({ params }: { params: { ticker: string } }) {

    const {cik} = await findCompany(params.ticker);

    if(cik) {
        const companyConcepts = await fetchCompanyConcepts(cik);
        return (
            <h1>Pruebas2</h1>
        )
    } 
    
}