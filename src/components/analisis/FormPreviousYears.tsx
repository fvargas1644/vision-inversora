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
        <form className={styles.vi_previusyears_form} action={sendData}> 
                <label htmlFor="wacc">WACC</label>
                <div className={styles.vi_previusyears_form_input_container}>
                    <input 
                        type="number" 
                        className={`${styles.vi_previusyears_form_input} ${formData.waccError && styles.hasWarning}`}
                        value={formData.wacc} 
                        onChange={(event) => updateWaccInputValue(event.target.value)} 
                        placeholder="WACC" 
                        id="wacc" 
                    />
                    
                </div>
                <label htmlFor="crecimiento">Crecimiento</label>
                <div className={styles.vi_previusyears_form_input_container}>
                    <input 
                        type="number" 
                        value={formData.growth} 
                        className={`${styles.vi_previusyears_form_input} ${formData.growthError && styles.hasWarning}`}
                        onChange={(event) => updateGrowthInputValue(event.target.value)} 
                        placeholder="Crecimiento" 
                        id="crecimiento" 
                    />
                </div>
        </form>
    )
}