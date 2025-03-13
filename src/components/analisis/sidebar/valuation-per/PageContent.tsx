'use client'

import { AnalysisContext } from "@/context/AnalysisContext";
import { ValuationPerContext } from "@/context/ValuationPerContext";
import { useContext } from "react";
import Header from "@/components/analisis/sidebar/valuation-per/Header";
import FinancialDataTables from "./FinancialDataTables";
import LineChart from "./chart";

export default function PageContent() {

    const { financialModel } = useContext(ValuationPerContext);
    const { ticker, company } = useContext(AnalysisContext);

    if (financialModel) {
        return (
            <>
                <LineChart />
                <Header ticker={ticker} company={company} stockPrice={financialModel.stockPrice}/>
                <FinancialDataTables financialData={financialModel.financialData} predictionsData={financialModel.predictionsData}/>
            </>
        )
    }
}