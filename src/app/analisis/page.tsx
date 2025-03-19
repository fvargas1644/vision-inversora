import styles from "@/styles/analisis/Page.module.css"
import Link from "next/link"
import { Smartphone, Monitor, ShoppingCart, Briefcase, Car, Cpu, Heart, ShoppingBag } from "lucide-react"

// Mock stock data with icon mappings
const stocksData = [
  { symbol: "AAPL", name: "Apple Inc.", sector: "Technology", icon: Smartphone },
  { symbol: "MSFT", name: "Microsoft Corporation", sector: "Technology", icon: Monitor },
  { symbol: "GOOGL", name: "Alphabet Inc.", sector: "Technology", icon: Monitor },
  { symbol: "AMZN", name: "Amazon.com, Inc.", sector: "Consumer Cyclical", icon: ShoppingCart },
  { symbol: "META", name: "Meta Platforms, Inc.", sector: "Technology", icon: Monitor },
  { symbol: "TSLA", name: "Tesla, Inc.", sector: "Automotive", icon: Car },
  { symbol: "NVDA", name: "NVIDIA Corporation", sector: "Technology", icon: Cpu },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", sector: "Financial Services", icon: Briefcase },
  { symbol: "V", name: "Visa Inc.", sector: "Financial Services", icon: Briefcase },
  { symbol: "JNJ", name: "Johnson & Johnson", sector: "Healthcare", icon: Heart },
  { symbol: "WMT", name: "Walmart Inc.", sector: "Consumer Defensive", icon: ShoppingBag },
  { symbol: "PG", name: "Procter & Gamble Co.", sector: "Consumer Defensive", icon: ShoppingBag },
]

export default async function Page() {

    return (
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Stock Catalog</h1>
          <p className={styles.subtitle}>
            Browse our comprehensive list of stocks and click on any card to view detailed analysis
          </p>
        </div>
        <div className={styles.stockGrid}>
          {stocksData.map((stock) => (
            <div key={stock.symbol} className={styles.stockCard}>
              <Link href={`/stocks/${stock.symbol}`} className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <span className={styles.symbol}>{stock.symbol}</span>
                  <div className={styles.iconContainer}>
                    <stock.icon className={styles.cardIcon} />
                  </div>
                </div>
                <h3 className={styles.name}>{stock.name}</h3>
                <div className={styles.sector}>{stock.sector}</div>
              </Link>
              <div className={styles.toolOptions}>
                <Link href={`/tools/intrinsic-value?symbol=${stock.symbol}`} className={styles.toolButton}>
                  Calculate Intrinsic Value
                </Link>
                <Link href={`/tools/portfolio?add=${stock.symbol}`} className={styles.toolButton}>
                  Add to Portfolio
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }
  