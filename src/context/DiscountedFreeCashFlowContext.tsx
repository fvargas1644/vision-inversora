'use client'

import React, { useState } from "react";
import { FinancialModel, CashFlowContext, updateFinancialModel, UpdateStatusOptions } from "@/context/definitions";
import getFinancialData from "@/lib/discounted-free-cash-flow/getData";

// Contexto con un nombre más claro
export const DiscontedFreeCashFlowContext = React.createContext<CashFlowContext>({financialModel: null, updateFinancialModel: null});

const inversePercentage = (value : number) => {
    return value/100;
}

// Componente con nombres mejorados
export default function DiscontedFreeCashFlowProvider({ children, initialData, stock }: { 
    children: React.ReactNode; 
    initialData: FinancialModel; 
    stock: string
}) {
    const [financialDataState, setFinancialDataState] = useState(initialData);

    async function updateFinancialModel({wacc, growth} : updateFinancialModel) : Promise<UpdateStatusOptions>{
        try {
            const data = await getFinancialData({stock, initialWacc: inversePercentage(wacc), initialGrowth: inversePercentage(growth) });
            setFinancialDataState(previousData => ({...previousData, ...data}));
            return "success"
        } catch (error) {
            return "error"
        }
        
    }

    return (
        <DiscontedFreeCashFlowContext.Provider value={{ financialModel: { ...financialDataState }, updateFinancialModel }}>
            {children}
        </DiscontedFreeCashFlowContext.Provider>
    );
}
