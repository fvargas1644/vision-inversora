import { FutureYearsDataType } from "@/lib/discounted-free-cash-flow/definitions"
import styles from '@/styles/analisis/discounted-free-cash-flow/tableFutureData.module.css'

export default function TableFutureData({ futureYearsData }: { futureYearsData: FutureYearsDataType[] }) {
    return (
        <div className="vi_page_container" style={{ overflowX: 'auto',  position: 'relative'}}>
            <table className={styles.vi_table}>
            <thead>
                <tr>
                    <th></th>
                    {futureYearsData.map((item) => (
                        <th className={styles.vi_th_colum}  key={item.year}>
                            <p>{item.year}</p>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className={styles.vi_tbody}>
                <tr>
                    <th className={styles.vi_th_row}>Total Revenue</th>
                    {futureYearsData.map((item) => (
                        <td key={item.year}>
                            <p>{(Math.floor(item.data.annualTotalRevenue)).toLocaleString()}</p>
                        </td>
                    ))}
                </tr>
                <tr>
                    <th className={styles.vi_th_row}>Growth Rate</th>
                    {futureYearsData.map((item) => (
                        <td key={item.year}>
                            <p>{(item.data.growthRate * 100).toFixed(2)}%</p>
                        </td>
                    ))}
                </tr>
                <tr>
                    <th className={styles.vi_th_row}>Net Income</th>
                    {futureYearsData.map((item) => (
                        <td key={item.year}>
                            <p>{(Math.floor(item.data.annualNetIncome)).toLocaleString()}</p>
                        </td>
                    ))}
                </tr>
                <tr>
                    <th className={styles.vi_th_row}>Margins</th>
                    {futureYearsData.map((item) => (
                        <td key={item.year}>
                            <p>{(item.data.margins * 100).toFixed(2)}%</p>
                        </td>
                    ))}
                </tr>
                <tr>
                    <th className={styles.vi_th_row}>Free Cash Flow</th>
                    {futureYearsData.map((item) => (
                        <td key={item.year}>
                            <p>{(Math.floor(item.data.annualFreeCashFlow)).toLocaleString()}</p>
                        </td>
                    ))}
                </tr>
                <tr>
                    <th className={styles.vi_th_row}>Free Cash Flow in <br />Net Income</th>
                    {futureYearsData.map((item) => (
                        <td key={item.year}>
                            <p>{item.data.freeCashFlowDividedNetIncome.toFixed(2)}</p>
                        </td>
                    ))}
                </tr>
                <tr>
                    <th className={styles.vi_th_row}>Discount Factor</th>
                    {futureYearsData.map((item) => (
                        <td key={item.year}>
                            <p>{item.data.discountFactor.toFixed(2)}</p>
                        </td>
                    ))}
                </tr>
                <tr>
                    <th className={styles.vi_th_row}>PV</th>
                    {futureYearsData.map((item) => (
                        <td key={item.year}>
                            <p>{(Math.floor(item.data.pv)).toLocaleString()}</p>
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
        </div>
        
    )
}