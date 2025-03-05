import styles from '@/styles/analisis/sidebar/discounted-free-cash-flow/FinancialData.module.css'
import { ValuationPerRatioFinancialData } from "@/lib/types/valuationPerRatio"
import { formatPrice } from '@/lib/utils'

export default function FinancialDataTables({ financialData, predictionsData }: { financialData: ValuationPerRatioFinancialData[], predictionsData: ValuationPerRatioFinancialData[]}) {
    return (
      <>   
      <section className={styles.financialData}>
          <h2>Datos Financieros</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>MarketCap</th>
                  <th>Revenue</th>
                  <th>Growth</th>
                  <th>Margins</th>
                  <th>NetIncome</th>
                  <th>PER</th>
                  <th>Shares</th>
                  <th>stockPrice</th>
                </tr>
              </thead>
              <tbody>
                {financialData.map((item) => (
                    <tr key={item.year}>
                        <td>{item.year}</td>
                        <td>${formatPrice(item.data.marketCap)}</td>
                        <td>${formatPrice(item.data.annualTotalRevenue)}</td>
                        <td className={item.data.revenueGrowth > 0 ? styles.positive : styles.negative}>{(item.data.revenueGrowth * 100).toFixed(2)}%</td>
                        <td className={item.data.margin > 0 ? styles.positive : styles.negative}>{(item.data.margin * 100).toFixed(2)}%</td>
                        <td>${formatPrice(item.data.annualNetIncome)}</td>
                        <td>{item.data.per.toFixed(2)}</td>
                        <td>{formatPrice(item.data.shares)}</td>
                        <td>{formatPrice(item.data.stockPrice)}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        
        <section className={styles.financialData}>
          <h2>Predicciones</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>MarketCap</th>
                  <th>Revenue</th>
                  <th>Growth</th>
                  <th>Margins</th>
                  <th>NetIncome</th>
                  <th>PER</th>
                  <th>Shares</th>
                  <th>stockPrice</th>
                </tr>
              </thead>
              <tbody>
                {predictionsData.map((item) => (
                  <tr key={item.year}>
                    <td>{item.year}</td>
                    <td>${formatPrice(item.data.marketCap)}</td>
                    <td>${formatPrice(item.data.annualTotalRevenue)}</td>
                    <td className={item.data.revenueGrowth > 0 ? styles.positive : styles.negative}>{(item.data.revenueGrowth * 100).toFixed(2)}%</td>
                    <td className={item.data.margin > 0 ? styles.positive : styles.negative}>{(item.data.margin * 100).toFixed(2)}%</td>
                    <td>${formatPrice(item.data.annualNetIncome)}</td>
                    <td>{item.data.per.toFixed(2)}</td>
                    <td>{formatPrice(item.data.shares)}</td>
                    <td>{formatPrice(item.data.stockPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </>
    )
    
}