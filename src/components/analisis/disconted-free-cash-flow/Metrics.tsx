import styles from '@/styles/analisis/discounted-free-cash-flow/Metrics.module.css'
import { ArrowUpRight, LineChart, ArrowUp, ArrowDown } from "lucide-react"


export default function Metrics({ currentPrice, intrinsicValue }: { currentPrice: number, intrinsicValue: number }) {

  const isUndervalued = intrinsicValue > currentPrice

  return (
    <div className={styles.metricsGrid}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Current Price</h2>
          <LineChart className={styles.icon} />
        </div>
        <div className={styles.priceContainer}>
          <span className={styles.price}>${currentPrice.toFixed(2)}</span>
          <span className={styles.change}>↗ +2.5%</span>
        </div>
      </div>

      <div className={`${styles.card} ${isUndervalued ? styles.undervalued : styles.overvalued}`}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>Intrinsic Value</div>
          {isUndervalued ? (
            <ArrowUp className={` ${styles.undervalued}`} />
          ) : (
            <ArrowDown className={` ${styles.overvalued}`} />
          )}
        </div>
        <div>
          <div className={styles.valueContent}>
            <div className={`${styles.price} ${isUndervalued ? styles.undervalued : styles.overvalued}`}>${intrinsicValue.toFixed(2)}</div>
            <div className={`${styles.priceDifference} ${isUndervalued ? styles.undervalued : styles.overvalued}`}>
              {isUndervalued ? "+" : "-"}${Math.abs(intrinsicValue - currentPrice).toFixed(2)} (
              {((Math.abs(intrinsicValue - currentPrice) / currentPrice) * 100).toFixed(2)}%)
            </div>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Discounted Free Cash Flow</h2>
          <LineChart className={styles.icon} />
        </div>
        <div className={styles.calculator}>
          <div className={styles.inputs}>
            <div className={styles.inputGroup}>
              <label>WACC</label>
              <input type="text" value="10,3" />
            </div>
            <div className={styles.inputGroup}>
              <label>Growth</label>
              <input type="text" value="2,5" />
            </div>
          </div>
          <button className={styles.calculateButton}>Calculate</button>
        </div>
      </div>
    </div>
  )
}