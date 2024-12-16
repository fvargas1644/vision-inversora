import { useState } from "react"

function returnFormattedValueToPercent (value : number) {
    return Number((value*100).toFixed(2))
}

export default function useFormPreviousYears ({wacc, growth} : {wacc: number, growth:number}) {
    const [formData, setFormData] = useState({wacc: returnFormattedValueToPercent(wacc), growth : returnFormattedValueToPercent(growth)})

    const updateWaccInputValue = (value : string) => {
        setFormData({...formData, wacc: Number(value)})
    }

    const updateGrowthInputValue = (value: string) => {
        setFormData({...formData, growth: Number(value)})
    }

    return {
        updateWaccInputValue,
        updateGrowthInputValue,
        formData,
        returnFormattedValueToPercent
    }

}