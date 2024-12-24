'use client'

import { PreviousYearsDataType, FutureYearsDataType } from "@/lib/discounted-free-cash-flow/definitions";
import React, { useState } from "react";


interface FinancialData {
    previousYearsData: PreviousYearsDataType[];
    futureYearsData: FutureYearsDataType[];
    intrinsicPrice: number;
    stockPrice: number;
    wacc: number; 
    growth: number; 
}

interface CashFlowContextInterface {
    financialData: FinancialData;
    setFinancialData: React.Dispatch<React.SetStateAction<FinancialData>>;
}

// Contexto con un nombre más claro
export const DiscontedFreeCashFlowProviderContext = React.createContext<CashFlowContextInterface | null>(null);

// Componente con nombres mejorados
export default function DiscontedFreeCashFlowProvider({ children, initialData }: { 
    children: React.ReactNode; 
    initialData: FinancialData; 
}) {
    const [financialDataState, setFinancialDataState] = useState(initialData);

    return (
        <DiscontedFreeCashFlowProviderContext.Provider value={{ financialData: { ...financialDataState }, setFinancialData: setFinancialDataState }}>
            {children}
        </DiscontedFreeCashFlowProviderContext.Provider>
    );
}
