'use client'

import { UpdateStatusOptions } from "@/context/definitions"
import { DiscontedFreeCashFlowContext } from "@/context/DiscountedFreeCashFlowContext"
import { validateGrowth, validateWacc } from "@/lib/validation/frontend/discounted-free-cash-flow/validations"
import { useContext, useEffect, useState } from "react"

function returnFormattedValueToPercent (value : number) {
    return Number((value*100).toFixed(2))
}

export interface FormData {
    waccError: null | string,
    growthError: null | string,
    wacc: number,
    growth: number,
    updateStatus: UpdateStatusOptions,
    updateMessage: string
}



export default function useFormPreviousYears ({wacc, growth} : {wacc: number, growth:number}) {

    const {updateFinancialModel} = useContext(DiscontedFreeCashFlowContext)

    const [formData, setFormData] = useState<FormData>({
        wacc: returnFormattedValueToPercent(wacc), 
        growth: returnFormattedValueToPercent(growth),
        waccError: null,
        growthError: null,
        updateStatus: 'unstarted',
        updateMessage: ''
    });

    const UPDATE_STATUS_OPTIONS  = {
        unstarted: () =>{},
        processing: () =>{},
        success: () =>{ 
            setFormData({...formData, updateMessage: 'Datos actualizados.', updateStatus: "success"});
        },
        error: () =>{ 
            setFormData({...formData, updateMessage: 'Error al actualizar los datos.', updateStatus: "error"});
        },
    }
    
    useEffect(() => {
        const ejec = async () => {
            if(updateFinancialModel && formData.updateStatus=== "processing"){
                setFormData({...formData, updateMessage: 'Procesando datos...'});
                const responseUpdateFinancialData = await updateFinancialModel({wacc: formData.wacc, growth: formData.growth});
                setFormData({...formData, updateStatus: responseUpdateFinancialData});
                UPDATE_STATUS_OPTIONS[responseUpdateFinancialData]()
            }
        }
        ejec()
    }, [formData.updateStatus]);

    const updateWaccInputValue = (value : string) => {

        if(!validateWacc(Number(value))){
            setFormData({
                ...formData, 
                wacc: Number(value)
            });
        }
    }

    const updateGrowthInputValue = (value: string) => {
        
        if(!validateGrowth(Number(value))){
            setFormData({
                ...formData, 
                growth: Number(value)
            });
        }
    } 

    const sendData = async () => {
        if(!formData.waccError && !formData.growthError) {
            setFormData({...formData, updateStatus: "processing", updateMessage: 'Procesando datos...'});
        }
    }

    return {
        updateWaccInputValue,
        updateGrowthInputValue,
        formData,
        sendData
    }

}