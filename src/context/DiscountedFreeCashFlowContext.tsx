'use client'

import React, { useState } from "react";
import { FinancialData, CashFlowContextInterface, UpdateFinancialData } from "@/context/definitions";

// Contexto con un nombre más claro
export const DiscontedFreeCashFlowProviderContext = React.createContext<CashFlowContextInterface>({financialData: null, updateFinancialData: null});

// Componente con nombres mejorados
export default function DiscontedFreeCashFlowProvider({ children, initialData }: { 
    children: React.ReactNode; 
    initialData: FinancialData; 
}) {
    const [financialDataState, setFinancialDataState] = useState(initialData);

    function updateFinancialData({wacc, growth} : UpdateFinancialData){
        setFinancialDataState(previousData => ({...previousData, wacc, growth}))
    }

    return (
        <DiscontedFreeCashFlowProviderContext.Provider value={{ financialData: { ...financialDataState }, updateFinancialData }}>
            {children}
        </DiscontedFreeCashFlowProviderContext.Provider>
    );
}
