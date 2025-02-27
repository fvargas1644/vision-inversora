'use client'

import React, { useState } from "react";
import { FinancialModel, CashFlowContext, updateFinancialModel, UpdateStatusOptions } from "@/context/definitions";
import getDataDiscontedFreeCashFlow from "@/lib/discounted-free-cash-flow/getData";

export const DiscontedFreeCashFlowContext = React.createContext<CashFlowContext>({financialModel: null, updateFinancialModel: null});

const inversePercentage = (value : number) => {
    return value/100;
}

export default function DiscontedFreeCashFlowProvider({ children, initialData, ticker }: { 
    children: React.ReactNode; 
    initialData: FinancialModel; 
    ticker: string
}) {
    const [financialDataState, setFinancialDataState] = useState(initialData);

    async function updateFinancialModel({wacc, growth} : updateFinancialModel) : Promise<UpdateStatusOptions>{
        try {
            const data = await getDataDiscontedFreeCashFlow({ticker, initialWacc: inversePercentage(wacc), initialGrowth: inversePercentage(growth) });
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
