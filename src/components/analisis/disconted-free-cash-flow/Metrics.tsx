import styles from '@/styles/analisis/discounted-free-cash-flow/Metrics.module.css'
import { ArrowUpRight } from "lucide-react"


export default function Metrics({currentPrice, intrinsicValue} : {currentPrice: number, intrinsicValue: number}) {

    return (
        <div className={styles.metricsGrid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Current Price</h2>
              <ArrowUpRight className={styles.icon} />
            </div>
            <div className={styles.priceContainer}>
              <span className={styles.price}>${currentPrice.toFixed(2)}</span>
              <span className={styles.change}>↗ +2.5%</span>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Intrinsic Value</h2>
              <ArrowUpRight className={styles.icon} />
            </div>
            <div className={styles.priceContainer}>
              <span className={styles.price}>${intrinsicValue.toFixed(2)}</span>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Discounted Free Cash Flow</h2>
              <ArrowUpRight className={styles.icon} />
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