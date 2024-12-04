import styles from '@/styles/analisis/discounted-free-cash-flow/formPreviousYears.module.css'

export default function FormPreviousYears({wacc, growth} : {wacc: number, growth: number}) {
    const waccState = (wacc*100).toFixed(2);
    const growthState = (growth*100).toFixed(2);
    return (
        <form className={styles.previusYears_form}> 
            <label htmlFor="wacc">WACC</label>
            <input type="number" value={waccState} placeholder="WACC" id="wacc" step="0.001" required/>
            <label htmlFor="crecimiento">Crecimiento</label>
            <input type="number" value={growthState} placeholder="Crecimiento" id="crecimiento"  step="0.001" required/>
            <button type="button">Actualizar</button>
        </form>
    )
}