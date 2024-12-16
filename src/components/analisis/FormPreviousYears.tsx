'use client'

import useFormPreviousYears from '@/hooks/analisis/discounted-free-cash-flow/useFormPreviousYears';
import styles from '@/styles/analisis/discounted-free-cash-flow/formPreviousYears.module.css'

export default function FormPreviousYears({wacc, growth} : {wacc: number, growth: number}) {
    
    const {
        updateWaccInputValue, 
        updateGrowthInputValue, 
        formData, 
        returnFormattedValueToPercent
    } = useFormPreviousYears({wacc, growth})

    return (
        <form className={styles.previusYears_form} > 
            <label htmlFor="wacc">WACC</label>
            <input 
                type="number" 
                value={formData.wacc} 
                onChange={(event) => updateWaccInputValue(event.target.value)} 
                placeholder="WACC" 
                id="wacc" 
                step="0.001" 
                required
            />
            <label htmlFor="crecimiento">Crecimiento</label>
            <input 
                type="number" 
                value={formData.growth} 
                onChange={(event) => updateGrowthInputValue(event.target.value)} 
                placeholder="Crecimiento" 
                id="crecimiento"  
                step="0.001" 
                required
            />
            <button type="submit">Actualizar</button>
        </form>
    )
}