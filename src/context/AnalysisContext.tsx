'use client'

import React from "react";
import { AnalysisContextInterface } from "./definitions";

export const AnalysisContext = React.createContext<AnalysisContextInterface>({ticker: '', company: ''});

export default function AnalysisProvider({children, ticker, company} : {children: React.ReactNode, ticker: string, company: string}){

    return (
        <AnalysisContext.Provider value={{ticker, company}}>
            {children}
        </AnalysisContext.Provider>
    )
}

