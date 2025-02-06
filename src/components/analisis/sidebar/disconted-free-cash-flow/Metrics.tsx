import styles from '@/styles/analisis/sidebar/discounted-free-cash-flow/Metrics.module.css'
import { LineChart, ArrowUp, ArrowDown } from "lucide-react"
import FormMetrics from './FormMetrics'


export default function Metrics({ currentPrice, intrinsicValue }: { currentPrice: number, intrinsicValue: number }) {

  const isUndervalued = intrinsicValue > currentPrice

  return (
    <div className={styles.metricsGrid}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Precio Actual</h2>
          <LineChart className={styles.icon} />
        </div>
        <div className={styles.priceContainer}>
          <span className={styles.price}>${currentPrice.toFixed(2)}</span>
          <span className={styles.change}>↗ +2.5%</span>
        </div>
      </div>

      <div className={`${styles.card} ${isUndervalued ? styles.undervalued : styles.overvalued}`}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>Valor Estimado</div>
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
      <FormMetrics />
    </div>
  )
}