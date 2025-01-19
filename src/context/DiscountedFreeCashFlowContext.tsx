'use client'

import React, { useState } from "react";
import { FinancialData, CashFlowContextInterface, UpdateFinancialData, UpdateStatusOptions } from "@/context/definitions";
import getFinancialData from "@/lib/discounted-free-cash-flow/getData";

// Contexto con un nombre más claro
export const DiscontedFreeCashFlowProviderContext = React.createContext<CashFlowContextInterface>({financialData: null, updateFinancialData: null});

const inversePercentage = (value : number) => {
    return value/100;
}

// Componente con nombres mejorados
export default function DiscontedFreeCashFlowProvider({ children, initialData, stock }: { 
    children: React.ReactNode; 
    initialData: FinancialData; 
    stock: string
}) {
    const [financialDataState, setFinancialDataState] = useState(initialData);

    async function updateFinancialData({wacc, growth} : UpdateFinancialData) : Promise<UpdateStatusOptions>{
        try {
            const data = await getFinancialData({stock, initialWacc: inversePercentage(wacc), initialGrowth: inversePercentage(growth) });
            setFinancialDataState(previousData => ({...previousData, ...data}));
            return "success"
        } catch (error) {
            return "error"
        }
        
    }

    return (
        <DiscontedFreeCashFlowProviderContext.Provider value={{ financialData: { ...financialDataState }, updateFinancialData }}>
            {children}
        </DiscontedFreeCashFlowProviderContext.Provider>
    );
}
