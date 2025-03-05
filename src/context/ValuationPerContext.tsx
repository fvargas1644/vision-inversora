'use client'

import React, { useState } from "react";

export const ValuationPerContext = React.createContext({financialModel: null});

export default function ValuationPerProvider({ children, initialData }: { 
    children: React.ReactNode; 
    initialData: any; 
}) {
    const [financialDataState, setFinancialDataState] = useState(initialData);


    return (
        <ValuationPerContext.Provider value={{ financialModel: { ...financialDataState } }}>
            {children}
        </ValuationPerContext.Provider>
    );
}