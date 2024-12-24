import Description from "@/components/analisis/Description";
import { Header } from "@/components/analisis/Header";
import TableFutureData from "@/components/analisis/TableFutureData";
import TablePreviousData from "@/components/analisis/TablePreviousData";
import getFinancialData from "@/lib/discounted-free-cash-flow/getData";
import styles from '@/styles/analisis/discounted-free-cash-flow/page.module.css'
import FormPreviousYears from '@/components/analisis/FormPreviousYears'
import DiscontedFreeCashFlowProvider from "@/context/DiscountedFreeCashFlowContext";

export default async function StockAnalysisPage({ params }: { params: { stock: string } }) {
    const data = await getFinancialData(params.stock);

    return (
        <DiscontedFreeCashFlowProvider initialData={data}>
            <section className="center_content">
                <Header
                    stockName={params.stock}
                    stockPrice={data.stockPrice}
                    stockintrinsicPrice={Math.floor(data.intrinsicPrice * 100) / 100}
                >
                    Disconted Free<br />Cash Flow
                </Header>
            </section>
            <section className="center_content" style={{ backgroundColor: '#88D5BA' }}>
                <Description title="">
                    El método de flujo de caja descontado (DCF) con flujos de caja libres (FCF) es una técnica de
                    valoración financiera que estima el valor presente de una empresa o activo basado en los flujos
                    de caja futuros proyectados, descontados a una tasa que refleja el riesgo y el costo del capital (WACC).
                    Se proyectan los flujos de caja libres para los próximos años, se calcula un valor terminal para el
                    período posterior, y luego se descuentan todos estos valores al presente para obtener la valoración
                    de la empresa. Este método es útil para evaluar la capacidad de una empresa para generar valor a
                    largo plazo, pero depende de la precisión de las proyecciones de flujos y de una correcta selección
                    de la tasa de descuento.
                </Description>
            </section>
            <section className="center_content">
                <div className="vi_page_container" style={{ padding: '20px' }}>
                    <div className={styles.previusYears_container}>
                        <TablePreviousData previousYearsData={data.previousYearsData} />
                        <FormPreviousYears wacc={data.wacc} growth={data.growth} />
                    </div>
                    <TableFutureData futureYearsData={data.futureYearsData} />
                </div>
            </section>
        </DiscontedFreeCashFlowProvider>
    )
}