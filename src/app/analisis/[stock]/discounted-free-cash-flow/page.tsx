
import getFinancialData from "@/lib/discounted-free-cash-flow/getData";
import DiscontedFreeCashFlowProvider from "@/context/DiscountedFreeCashFlowContext";
import PageContent from "@/components/analisis/disconted-free-cash-flow/PageContent";

export default async function StockAnalysisPage({ params }: { params: { stock: string } }) {
    const data = await getFinancialData(params.stock);

    return (
        <DiscontedFreeCashFlowProvider initialData={data}>
            <PageContent stock={params.stock}/>
        </DiscontedFreeCashFlowProvider>
    )
}