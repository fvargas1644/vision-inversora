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
    financialData: FinancialData | null;
    updateFinancialData: ((updates: FinancialData) => void) | null;
}

// Contexto con un nombre más claro
export const DiscontedFreeCashFlowProviderContext = React.createContext<CashFlowContextInterface>({financialData: null, updateFinancialData: null});

// Componente con nombres mejorados
export default function DiscontedFreeCashFlowProvider({ children, initialData }: { 
    children: React.ReactNode; 
    initialData: FinancialData; 
}) {
    const [financialDataState, setFinancialDataState] = useState(initialData);

    function updateFinancialData(updates : FinancialData){
        setFinancialDataState(previousData => ({...previousData, ...updates}))
    }

    return (
        <DiscontedFreeCashFlowProviderContext.Provider value={{ financialData: { ...financialDataState }, updateFinancialData }}>
            {children}
        </DiscontedFreeCashFlowProviderContext.Provider>
    );
}
