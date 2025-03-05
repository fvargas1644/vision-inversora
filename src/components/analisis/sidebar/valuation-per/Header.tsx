import styles from '@/styles/analisis/sidebar/valuation-per/header.module.css'

export default function Header({ticker, company, stockPrice} : {ticker: string, company: string, stockPrice: number}){
    return (
        <header className={styles.card}>
            <h1 >{company} ({ticker})</h1>
            <h2>{stockPrice}</h2>
        </header>
    )
}