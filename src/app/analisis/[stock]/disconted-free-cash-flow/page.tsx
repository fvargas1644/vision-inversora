import { Header } from "@/components/analisis/Header";
import TableFutureData from "@/components/analisis/TableFutureData";
import TablePreviousData from "@/components/analisis/TablePreviousData";
import getFinancialData from "@/lib/discounted-free-cash-flow/getData";
import styles from '@/styles/analisis/discounted-free-cash-flow/page.module.css'

export default async function StockAnalysisPage({ params }: { params: { stock: string } }) {
    const  {
        previousYearsData,
        futureYearsData,
        intrinsicPrice,
        stockPrice
    } = await getFinancialData(params.stock)
    return ( 
        <>
            <section className={styles.vi_header_section}>
                <Header
                    stockName={params.stock}
                    stockPrice={stockPrice}
                    stockintrinsicPrice={Math.floor(intrinsicPrice * 100)/100}
                />
            </section>

           <TablePreviousData previousYearsData={previousYearsData}/>
           <br />
           <TablePreviousData previousYearsData={previousYearsData}/>
           <TableFutureData futureYearsData={futureYearsData}/>
        </>
    )
}