'use client'

import useFormPreviousYears from '@/hooks/analisis/discounted-free-cash-flow/useFormPreviousYears';
import styles from '@/styles/analisis/discounted-free-cash-flow/formPreviousYears.module.css'

export default function FormPreviousYears({wacc, growth} : {wacc: number, growth: number}) {
    
    const {
        updateWaccInputValue, 
        updateGrowthInputValue, 
        formData,
        sendData
    } = useFormPreviousYears({wacc, growth})

    return (
        <form className={styles.previusYears_form} action={sendData}> 
            <label htmlFor="wacc">WACC</label>
            <input 
                type="number" 
                className={`${formData.waccError && styles.hasWarning}`}
                value={formData.wacc} 
                onChange={(event) => updateWaccInputValue(event.target.value)} 
                placeholder="WACC" 
                id="wacc" 
            />
            <label htmlFor="crecimiento">Crecimiento</label>
            <input 
                type="number" 
                value={formData.growth} 
                className={`${formData.growthError && styles.hasWarning}`}
                onChange={(event) => updateGrowthInputValue(event.target.value)} 
                placeholder="Crecimiento" 
                id="crecimiento" 
            />
            <button type="submit">Actualizar</button>
        </form>
    )
}