'use client'

import useFormPreviousYears from '@/hooks/analisis/discounted-free-cash-flow/useFormPreviousYears';
import styles from '@/styles/analisis/discounted-free-cash-flow/formPreviousYears.module.css'

const UPDATE_STATUS_OPTIONS : { [key in 'wait' | 'success' | 'fail']: string } = {
    wait: '',
    success: 'Operación exitosa',
    fail: 'Error en los datos'
}
  
export default function FormPreviousYears({ wacc, growth }: { wacc: number, growth: number }) {

    const {
        updateWaccInputValue,
        updateGrowthInputValue,
        formData,
        sendData
    } = useFormPreviousYears({ wacc, growth })

    const a = formData.updateStatus

    const prueba = UPDATE_STATUS_OPTIONS[formData.updateStatus] 

    return (
        <form className={styles.vi_previusyears_form} action={sendData}>
            <div className={styles.vi_previusyears_form_input_container}>
                <label className={`${styles.vi_previusyears_form_label} ${formData.waccError && styles.hasWarning}`} htmlFor="wacc">
                    WACC
                </label>
                <input
                    type="number"
                    className={`${styles.vi_previusyears_form_input} ${formData.waccError && styles.hasWarning}`}
                    value={formData.wacc}
                    onChange={(event) => updateWaccInputValue(event.target.value)}
                    placeholder="WACC"
                    id="wacc"
                />
                <p className={styles.vi_previusyears_form_warning}>
                    {formData.waccError}
                </p>
            </div>
            <div className={styles.vi_previusyears_form_input_container}>
                <label className={`${styles.vi_previusyears_form_label} ${formData.growthError && styles.hasWarning}`}  htmlFor="growth">
                    Crecimiento
                </label>
                <input
                    type="number"
                    value={formData.growth}
                    className={`${styles.vi_previusyears_form_input} ${formData.growthError && styles.hasWarning}`}
                    onChange={(event) => updateGrowthInputValue(event.target.value)}
                    placeholder="Crecimiento"
                    id="growth"
                />
                <p className= {`${styles.vi_previusyears_form_warning} `}>
                    {formData.growthError}
                </p>
            </div>

            {prueba}
            <button 
                type="submit" 
                className={`${styles.vi_previusyears_form_submitbutton} ${(formData.growthError || formData.waccError) && styles.hasWarning}`}
            >
                Actualizar
            </button>
        </form>
    )
}