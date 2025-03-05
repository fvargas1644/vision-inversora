'use client'

import { AnalysisContext } from "@/context/AnalysisContext";
import { ValuationPerContext } from "@/context/ValuationPerContext";
import { useContext } from "react";
import Header from "@/components/analisis/sidebar/valuation-per/Header";

export default function PageContent() {

    const { financialModel } = useContext(ValuationPerContext);
    const { ticker, company } = useContext(AnalysisContext);

    if (financialModel) {
        return (
            <>
                <Header ticker={ticker} company={company} stockPrice={financialModel.stockPrice}/>
            </>
        )
    }
}