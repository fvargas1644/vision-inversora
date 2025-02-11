import { AnalysisContextInterface } from '@/context/definitions'
import styles from '@/styles/analisis/sidebar/discounted-free-cash-flow/Title.module.css'

export default function Title({ticker, company} : AnalysisContextInterface){
    return(
        <div>
        <h1 className={styles.companyName}>{company} ({ticker})</h1>
    </div>
    )
}