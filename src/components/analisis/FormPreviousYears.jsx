import styles from '@/styles/analisis/discounted-free-cash-flow/formPreviousYears.module.css'

export default function FormPreviousYears() {
    return (
        <form className={styles.previusYears_form}> 
            <label htmlFor="wacc">WACC</label>
            <input type="number" placeholder="WACC" id="wacc" step="0.001" required/>
            <label htmlFor="crecimiento">Crecimiento</label>
            <input type="number" placeholder="Crecimiento" id="crecimiento" step="0.001" required/>
            <button type="button">Actualizar</button>
        </form>
    )
}