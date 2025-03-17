'use client'

import { AnalysisContext } from "@/context/AnalysisContext";
import { ValuationPerContext } from "@/context/ValuationPerContext";
import { useContext } from "react";
import Header from "@/components/analisis/sidebar/valuation-per/Header";
import FinancialDataTables from "./FinancialDataTables";
import PriceChart from "./PriceChart";

export default function PageContent() {

    const { financialModel } = useContext(ValuationPerContext);
    const { ticker, company } = useContext(AnalysisContext);

    if (financialModel) {
        const prices =  financialModel.predictionsData.map( obj => obj.data.stockPrice.toFixed(1))
        const years =  financialModel.predictionsData.map( obj => String(obj.year))
        return (
            <>
                <Header ticker={ticker} company={company} stockPrice={financialModel.stockPrice}/>
                <PriceChart prices={prices} years={years}/>
                <FinancialDataTables financialData={financialModel.financialData} predictionsData={financialModel.predictionsData}/>
            </>
        )
    }
}