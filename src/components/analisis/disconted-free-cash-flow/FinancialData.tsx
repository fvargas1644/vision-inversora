import styles from '@/styles/analisis/discounted-free-cash-flow/FinancialData.module.css'
import { PreviousYearsDataType } from "@/lib/discounted-free-cash-flow/definitions"

export default function FinancialData({ previousYearsData }: { previousYearsData: PreviousYearsDataType[] }) {
    return (
        <section className={styles.financialData}>
          <h2>Financial Data</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  
                  <th>Year</th>
                  <th>Total Revenue</th>
                  <th>Growth Rate</th>
                  <th>Net Income</th>
                  <th>Margins</th>
                  <th>Free Cash Flow</th>
                  <th>FCF Ratio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2023</td>
                  <td>$22680.00M</td>
                  <td className={styles.negative}>-3.9%</td>
                  <td>$854.00M</td>
                  <td>3.77%</td>
                  <td>$1121.00M</td>
                  <td>1.31</td>
                </tr>
                <tr>
                  <td>2022</td>
                  <td>$23601.00M</td>
                  <td className={styles.positive}>43.61%</td>
                  <td>$1320.00M</td>
                  <td>5.59%</td>
                  <td>$3115.00M</td>
                  <td>2.36</td>
                </tr>
                {previousYearsData.map((item) => (
                    <tr key={item.year}>
                        <td>{item.year}</td>
                        <td>{item.data.annualTotalRevenue.toLocaleString()}</td>
                        <td>{(item.data.growthRate * 100).toFixed(2)}%</td>
                        <td>{item.data.annualNetIncome.toLocaleString()}</td>
                        <td>{(item.data.margins * 100).toFixed(2)}%</td>
                        <td>{item.data.annualFreeCashFlow.toLocaleString()}</td>
                        <td>{item.data.freeCashFlowDividedNetIncome.toFixed(2)}</td>
                    </tr>
                ))}
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </section>
    )
    
}