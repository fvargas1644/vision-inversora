'use client'

import React from "react";
import { AnalysisContextInterface } from "./definitions";

export const AnalysisContext = React.createContext<AnalysisContextInterface>({ticker: '', company: '', cik: null});

export default function AnalysisProvider({children, ticker, company, cik} : {children: React.ReactNode, ticker: string, company: string, cik: number}){

    return (
        <AnalysisContext.Provider value={{ticker, company, cik}}>
            {children}
        </AnalysisContext.Provider>
    )
}

