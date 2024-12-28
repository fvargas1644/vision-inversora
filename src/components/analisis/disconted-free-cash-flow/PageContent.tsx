
'use client'

import styles from '@/styles/analisis/discounted-free-cash-flow/page.module.css'
import FormPreviousYears from '@/components/analisis/disconted-free-cash-flow/FormPreviousYears'
import Description from "@/components/analisis/Description";
import { Header } from "@/components/analisis/disconted-free-cash-flow/Header";
import TableFutureData from "@/components/analisis/disconted-free-cash-flow/TableFutureData";
import TablePreviousData from "@/components/analisis/disconted-free-cash-flow/TablePreviousData";
import { useContext } from 'react';
import { DiscontedFreeCashFlowProviderContext } from '@/context/DiscountedFreeCashFlowContext';


export default function PageContent({stock} : {stock : string}) {

    const { financialData } = useContext(DiscontedFreeCashFlowProviderContext);

    if(financialData) {
        return (
            <>
                <section className="center_content">
                    <Header
                        stockName={stock}
                        stockPrice={financialData.stockPrice}
                        stockintrinsicPrice={Math.floor(financialData.intrinsicPrice * 100) / 100}
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
                            <TablePreviousData previousYearsData={financialData.previousYearsData} />
                            <FormPreviousYears wacc={financialData.wacc} growth={financialData.growth} />
                        </div>
                        <TableFutureData futureYearsData={financialData.futureYearsData} />
                    </div>
                </section>
            </>
        )    
    }
    
}