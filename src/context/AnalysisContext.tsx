'use client'

import React from "react";
import { AnalysisContextInterface } from "./definitions";

export const AnalysisContext = React.createContext<AnalysisContextInterface>({stock: '', company: ''});

export default function AnalysisProvider({children, stock, company} : {children: React.ReactNode, stock: string, company: string}){

    return (
        <AnalysisContext.Provider value={{stock, company}}>
            {children}
        </AnalysisContext.Provider>
    )
}

