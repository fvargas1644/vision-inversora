import PageContent from "@/components/analisis/ticker/sidebar/valuation-per/PageContent";
import ValuationPerProvider from "@/context/ValuationPerContext";
import getDataValuationPerRatio from "@/lib/valuation-pe-ratio/getData";

export default async function Page({ params }: { params: { ticker: string } }) {

    const data = await getDataValuationPerRatio({ticker: params.ticker});
    return (
        <ValuationPerProvider initialData={data}>
            <PageContent />
        </ValuationPerProvider>
    )
     
}