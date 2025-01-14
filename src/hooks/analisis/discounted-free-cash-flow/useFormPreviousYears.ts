'use client'

import { DiscontedFreeCashFlowProviderContext } from "@/context/DiscountedFreeCashFlowContext"
import { validateGrowth, validateWacc } from "@/lib/validation/frontend/discounted-free-cash-flow/validations"
import { useContext, useState } from "react"

function returnFormattedValueToPercent (value : number) {
    return Number((value*100).toFixed(2))
}

export interface FormData {
    waccError: null | string,
    growthError: null | string,
    wacc: number,
    growth: number,
    updateStatus: boolean,
}
  

export default function useFormPreviousYears ({wacc, growth} : {wacc: number, growth:number}) {

    const {updateFinancialData} = useContext(DiscontedFreeCashFlowProviderContext)

    const [formData, setFormData] = useState<FormData>({
        wacc: returnFormattedValueToPercent(wacc), 
        growth: returnFormattedValueToPercent(growth),
        waccError: null,
        growthError: null,
        updateStatus: false,
    })

    const updateWaccInputValue = (value : string) => {
        setFormData({
            ...formData, 
            wacc: Number(value),
            waccError: validateWacc(Number(value))
        })
    }

    const updateGrowthInputValue = (value: string) => {
        setFormData({
            ...formData, 
            growth: Number(value),
            growthError: validateGrowth(Number(value))
        })
    }

    const sendData = async () => {
        if(!formData.waccError && !formData.growthError) {
            if(updateFinancialData){
                const responseUpdateFinancialData = await updateFinancialData({wacc: formData.wacc, growth: formData.growth})
                //setFormData({...formData, updateStatus: responseUpdateFinancialData})
            }
            
        }
    }

    return {
        updateWaccInputValue,
        updateGrowthInputValue,
        formData,
        sendData
    }

}