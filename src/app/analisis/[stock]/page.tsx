import { Header } from "@/components/analisis/Header";
import getFinancialData from "@/lib/discounted-free-cash-flow/getData";

export default async function StockAnalysisPage({ params }: { params: { stock: string } }) {
    const  {
        previousYearsData,
        futureYearsData,
        intrinsicPrice,
        stockPrice
    } = await getFinancialData(params.stock)

    return (
        <Header
            stockName={params.stock}
            stockPrice={stockPrice}
            stockintrinsicPrice={Math.floor(intrinsicPrice * 100)/100}
        />
    )
}