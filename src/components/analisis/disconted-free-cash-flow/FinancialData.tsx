import styles from '@/styles/analisis/discounted-free-cash-flow/FinancialData.module.css'
import { PreviousYearsDataType } from "@/lib/discounted-free-cash-flow/definitions"

function formatPrice(price: number): string {
    if (price >= 1_000_000_000) { 
        return (price / 1_000_000_000).toFixed(3) + 'B';
    } else if (price >= 1_000_000) { 
        return (price / 1_000_000).toFixed(3) + 'M'; 
    } else if (price >= 1_000) { 
        return (price / 1_000).toFixed(3) + 'K'; 
    } else {
        return price.toString();
    }
}

export default function FinancialData({ previousYearsData }: { previousYearsData: PreviousYearsDataType[] }) {
    return (
        <section className={styles.financialData}>
          <h2>Financial Data</h2>
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
    )
    
}