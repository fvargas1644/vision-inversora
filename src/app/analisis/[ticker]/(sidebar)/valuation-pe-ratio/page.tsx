import PageContent from "@/components/analisis/sidebar/valuation-per/PageContent";
import ValuationPerProvider from "@/context/ValuationPerContext";
import { findCompany } from "@/lib/utilsServer";
import getDataValuationPerRatio from "@/lib/valuation-pe-ratio/getData";

export default async function Page({ params }: { params: { ticker: string } }) {

    const {cik} = await findCompany(params.ticker);

    if(cik) {
        const data = await getDataValuationPerRatio({ticker: params.ticker, cik});
        return (
        <ValuationPerProvider initialData={data}>
            <PageContent />
        </ValuationPerProvider>
        )
    } else {
        return (
            <h1>No se encontraron datos de la compañia</h1>
        )
    }
    
}