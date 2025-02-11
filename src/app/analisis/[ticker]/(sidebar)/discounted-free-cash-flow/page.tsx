
import getFinancialData from "@/lib/discounted-free-cash-flow/getData";
import DiscontedFreeCashFlowProvider from "@/context/DiscountedFreeCashFlowContext";
import PageContent from "@/components/analisis/sidebar/disconted-free-cash-flow/PageContent";

export default async function StockAnalysisPage({ params }: { params: { ticker: string } }) {
    const data = await getFinancialData({ticker: params.ticker});

    return (
        <DiscontedFreeCashFlowProvider initialData={data} ticker={params.ticker}>
            <PageContent/>
        </DiscontedFreeCashFlowProvider>
    )
}