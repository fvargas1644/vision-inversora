
import getFinancialData from "@/lib/discounted-free-cash-flow/getData";
import DiscontedFreeCashFlowProvider from "@/context/DiscountedFreeCashFlowContext";
import PageContent from "@/components/analisis/disconted-free-cash-flow/PageContent";

export default async function StockAnalysisPage({ params }: { params: { stock: string } }) {
    const data = await getFinancialData({stock: params.stock});

    return (
        <DiscontedFreeCashFlowProvider initialData={data} stock={params.stock}>
            <PageContent/>
        </DiscontedFreeCashFlowProvider>
    )
}