'use client'

import { DiscontedFreeCashFlowProviderContext } from '@/context/DiscountedFreeCashFlowContext'
import useFormPreviousYears from '@/hooks/analisis/discounted-free-cash-flow/useFormPreviousYears'
import styles from '@/styles/analisis/discounted-free-cash-flow/Metrics.module.css'
import { LineChart } from "lucide-react"
import { useContext } from 'react'

export default function FormMetrics() {

    const { financialData } = useContext(DiscontedFreeCashFlowProviderContext);

    const {
        updateWaccInputValue,
        updateGrowthInputValue,
        formData,
        sendData
    } = useFormPreviousYears({ wacc: financialData.wacc, growth: financialData.growth })

    return (
        <div className={styles.card}>      
            <form action={sendData}>
                <div className={styles.cardHeader}>
                    <h2>Modificar Valores </h2>
                    <LineChart className={styles.icon} />
                </div>
                <div className={styles.calculator}>
                    <div className={styles.inputs}>
                        <div className={styles.inputGroup}>
                            <label>WACC</label>
                            <input
                                type="number"
                                value={formData.wacc}
                                onChange={(event) => updateWaccInputValue(event.target.value)}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Crecimiento</label>
                            <input
                                type="number"
                                value={formData.growth}
                                onChange={(event) => updateGrowthInputValue(event.target.value)}
                            />
                        </div>
                    </div>
                    {(formData.updateStatus === "success" || formData.updateStatus === "error") && (
                        <div className={`${styles.alert} ${formData.updateStatus === "success" ? styles.success : styles.error}`}>
                            <p>{formData.updateMessage}</p>
                        </div>
                    )
                    }
                    <button className={styles.calculateButton} type='submit'>Calculate</button>
                </div>
            </form>
        </div>
    )
}