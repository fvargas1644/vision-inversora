import styles from '@/styles/analisis/sidebar/discounted-free-cash-flow/FinancialData.module.css'
import { FutureYearsDataType, PreviousYearsDataType } from "@/lib/definitions"
import { formatPrice } from '@/lib/Utils'

export default function FinancialData({ previousYearsData, futureYearsData }: { previousYearsData: PreviousYearsDataType[], futureYearsData: FutureYearsDataType[]}) {
    return (
      <>   
      <section className={styles.financialData}>
          <h2>Datos Financieros</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Revenue</th>
                  <th>GrowthRate</th>
                  <th>NetIncome</th>
                  <th>Margins</th>
                  <th>FreeCashFlow</th>
                  <th>FCFRatio</th>
                </tr>
              </thead>
              <tbody>
                {previousYearsData.map((item) => (
                    <tr key={item.year}>
                        <td>{item.year}</td>
                        <td>${formatPrice(item.data.annualTotalRevenue)}</td>
                        <td className={item.data.growthRate > 0 ? styles.positive : styles.negative}>{(item.data.growthRate * 100).toFixed(2)}%</td>
                        <td>${formatPrice(item.data.annualNetIncome)}</td>
                        <td className={item.data.margins > 0 ? styles.positive : styles.negative}>{(item.data.margins * 100).toFixed(2)}%</td>
                        <td>${formatPrice(item.data.annualFreeCashFlow)}</td>
                        <td>{item.data.freeCashFlowDividedNetIncome.toFixed(2)}</td>
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
                  <th>Revenue</th>
                  <th>GrowthRate</th>
                  <th>NetIncome</th>
                  <th>Margins</th>
                  <th>FreeCashFlow</th>
                  <th>FCFRatio</th>
                </tr>
              </thead>
              <tbody>
                {futureYearsData.map((item) => (
                    <tr key={item.year}>
                        <td>{item.year}</td>
                        <td>${formatPrice(item.data.annualTotalRevenue)}</td>
                        <td className={item.data.growthRate > 0 ? styles.positive : styles.negative}>{(item.data.growthRate * 100).toFixed(2)}%</td>
                        <td>${formatPrice(item.data.annualNetIncome)}</td>
                        <td className={item.data.margins > 0 ? styles.positive : styles.negative}>{(item.data.margins * 100).toFixed(2)}%</td>
                        <td>${formatPrice(item.data.annualFreeCashFlow)}</td>
                        <td>{item.data.freeCashFlowDividedNetIncome.toFixed(2)}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </>
    )
    
}