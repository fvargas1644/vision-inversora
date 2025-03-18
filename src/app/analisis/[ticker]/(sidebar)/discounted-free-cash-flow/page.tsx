
import getDataDiscontedFreeCashFlow from "@/lib/discounted-free-cash-flow/getData";
import DiscontedFreeCashFlowProvider from "@/context/DiscountedFreeCashFlowContext";
import PageContent from "@/components/analisis/ticker/sidebar/discounted-free-cash-flow/PageContent";

export default async function StockAnalysisPage({ params }: { params: { ticker: string } }) {
    const data = await getDataDiscontedFreeCashFlow({ticker: params.ticker});

    return (
        <DiscontedFreeCashFlowProvider initialData={data} ticker={params.ticker}>
            <PageContent/>
        </DiscontedFreeCashFlowProvider>
    )
}