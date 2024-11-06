import { PreviousYearsDataType } from "@/lib/discounted-free-cash-flow/definitions"
import styles from '@/styles/analisis/tablePreviousData.module.css'

export default function TablePreviousData({ previousYearsData }: { previousYearsData: PreviousYearsDataType[] }) {
    return (
        <table className={styles.vi_table}>
            <thead>
                <tr>
                    <th></th>
                    {previousYearsData.map((item) => (
                        <th className={styles.vi_th_colum} key={item.year}>
                            <p>{item.year}</p>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th className={styles.vi_th_row}>Total Revenue</th>
                    {previousYearsData.map((item) => (
                        <td key={item.year}>
                            <p>{item.data.annualTotalRevenue.toLocaleString()}</p>
                        </td>
                    ))}
                </tr>
                <tr>
                    <th className={styles.vi_th_row}>Growth Rate</th>
                    {previousYearsData.map((item) => (
                        <td key={item.year}>
                            <p>{(item.data.growthRate * 100).toFixed(2)}%</p>
                        </td>
                    ))}
                </tr>
                <tr>
                    <th className={styles.vi_th_row}>Net Income</th>
                    {previousYearsData.map((item) => (
                        <td key={item.year}>
                            <p>{item.data.annualNetIncome.toLocaleString()}</p>
                        </td>
                    ))}
                </tr>
                <tr>
                    <th className={styles.vi_th_row}>Margins</th>
                    {previousYearsData.map((item) => (
                        <td key={item.year}>
                            <p>{(item.data.margins * 100).toFixed(2)}%</p>
                        </td>
                    ))}
                </tr>
                <tr>
                    <th className={styles.vi_th_row}>Free Cash Flow</th>
                    {previousYearsData.map((item) => (
                        <td key={item.year}>
                            <p>{item.data.annualFreeCashFlow.toLocaleString()}</p>
                        </td>
                    ))}
                </tr>
                <tr>
                    <th className={styles.vi_th_row}>Free Cash Flow in <br />Net Income</th>
                    {previousYearsData.map((item) => (
                        <td key={item.year}>
                            <p>{item.data.freeCashFlowDividedNetIncome.toFixed(2)}</p>
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    )
}