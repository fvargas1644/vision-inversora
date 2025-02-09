import { AnalysisContextInterface } from '@/context/definitions'
import styles from '@/styles/analisis/sidebar/discounted-free-cash-flow/Title.module.css'

export default function Title({stock, company} : AnalysisContextInterface){
    return(
        <div>
        <h1 className={styles.companyName}>{company} ({stock})</h1>
    </div>
    )
}