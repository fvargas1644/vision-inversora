'use client'

import { ValuationPerRatioFinancialData } from "@/lib/types/valuationPerRatio";
import React from "react";

export const ValuationPerContext = React.createContext({financialModel: null});

interface initialData{
    financialData: ValuationPerRatioFinancialData[],
    predictionsData: ValuationPerRatioFinancialData[],
    stockPrice: number
}

export default function ValuationPerProvider({ children, initialData }: { 
    children: React.ReactNode; 
    initialData: initialData; 
}) {
    //const [financialDataState, setFinancialDataState] = useState(initialData);


    return (
        <ValuationPerContext.Provider value={{ financialModel: { ...initialData } }}>
            {children}
        </ValuationPerContext.Provider>
    );
}