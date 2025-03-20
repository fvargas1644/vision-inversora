import { ArrowRight, BarChart2 } from "lucide-react"
import Link from "next/link"
import styles from "@/styles/Stocks.module.css"
import stylesUtils from "@/styles/Utils.module.css"

const featuredStocks = [
    { symbol: "AAPL", name: "Apple Inc.", sector: "Tecnología" },
    { symbol: "MSFT", name: "Microsoft Corporation", sector: "Tecnología" },
    { symbol: "GOOGL", name: "Alphabet Inc.", sector: "Tecnología" },
    { symbol: "NVDA", name: "Nvidia Corporation.", sector: "Tecnología" },
]

export default function Stocks() {
    return (
        <>
            <div className={styles.stocksGrid}>
                {featuredStocks.map((stock) => (
                    <Link key={stock.symbol} href={`/analisis/${stock.symbol}`} className={styles.stockCard}>
                        <div className={styles.stockCardContent}>
                            <div className={styles.stockHeader}>
                                <span className={styles.stockSymbol}>{stock.symbol}</span>
                                <div className={styles.stockIconContainer}>
                                    <BarChart2 className={styles.stockIcon} />
                                </div>
                            </div>
                            <h3 className={styles.stockName}>{stock.name}</h3>
                            <p className={styles.stockSector}>{stock.sector}</p>
                            <div className={styles.stockAction}>
                                View Analysis
                                <ArrowRight className={stylesUtils.smallIcon} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className={styles.actionContainer}>
                <Link href="/analisis" className={stylesUtils.secondaryButton}>
                    Ver Más
                    <ArrowRight className={stylesUtils.buttonIcon} />
                </Link>
            </div>
        </>
    )
}