import { Header } from "@/components/analisis/Header";
import TableFutureData from "@/components/analisis/TableFutureData";
import TablePreviousData from "@/components/analisis/TablePreviousData";
import getFinancialData from "@/lib/discounted-free-cash-flow/getData";

export default async function StockAnalysisPage({ params }: { params: { stock: string } }) {
    const  {
        previousYearsData,
        futureYearsData,
        intrinsicPrice,
        stockPrice
    } = await getFinancialData(params.stock)

    //console.log(futureYearsData)

    return (
        <>
            <Header
                stockName={params.stock}
                stockPrice={stockPrice}
                stockintrinsicPrice={Math.floor(intrinsicPrice * 100)/100}
            />

           <TablePreviousData previousYearsData={previousYearsData}/>
           <TableFutureData futureYearsData={futureYearsData}/>

        </>
    )
}