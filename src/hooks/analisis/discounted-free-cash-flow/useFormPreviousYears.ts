import { validateWacc } from "@/lib/validation/discounted-free-cash-flow/validations"
import { useState } from "react"

function returnFormattedValueToPercent (value : number) {
    return Number((value*100).toFixed(2))
}

export default function useFormPreviousYears ({wacc, growth} : {wacc: number, growth:number}) {
    const [formData, setFormData] = useState({wacc: returnFormattedValueToPercent(wacc), growth : returnFormattedValueToPercent(growth)})

    const updateWaccInputValue = (value : string) => {
        const valida = validateWacc(Number(value))
        setFormData({...formData, wacc: Number(value)})
    }

    const updateGrowthInputValue = (value: string) => {
        setFormData({...formData, growth: Number(value)})
    }

    const sendData = () => {
        //
    }

    return {
        updateWaccInputValue,
        updateGrowthInputValue,
        formData,
        sendData
    }

}