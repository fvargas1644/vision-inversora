import { FutureYearsDataType } from "@/lib/discounted-free-cash-flow/definitions"
import styles from '@/styles/analisis/tableFutureData.module.css'

export default function TableFutureData({ futureYearsData }: { futureYearsData: FutureYearsDataType[] }) {
    return (
        <table className={styles.vi_table}>
            <thead>
                <tr>
                    <th></th>
                    {futureYearsData.map((item) => (
                        <th key={item.year}>
                            <p>{item.year}</p>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Total Revenue</td>
                    {futureYearsData.map((item) => (
                        <td key={item.year}>
                            <p>{(Math.floor(item.data.annualTotalRevenue)).toLocaleString()}</p>
                        </td>
                    ))}
                </tr>
                <tr>
                    <td>Growth Rate</td>
                    {futureYearsData.map((item) => (
                        <td key={item.year}>
                            <p>{(item.data.growthRate * 100).toFixed(2)}%</p>
                        </td>
                    ))}
                </tr>
                <tr>
                    <td>Net Income</td>
                    {futureYearsData.map((item) => (
                        <td key={item.year}>
                            <p>{(Math.floor(item.data.annualNetIncome)).toLocaleString()}</p>
                        </td>
                    ))}
                </tr>
                <tr>
                    <td>Margins</td>
                    {futureYearsData.map((item) => (
                        <td key={item.year}>
                            <p>{(item.data.margins * 100).toFixed(2)}%</p>
                        </td>
                    ))}
                </tr>
                <tr>
                    <td>Free Cash Flow</td>
                    {futureYearsData.map((item) => (
                        <td key={item.year}>
                            <p>{(Math.floor(item.data.annualFreeCashFlow)).toLocaleString()}</p>
                        </td>
                    ))}
                </tr>
                <tr>
                    <td>Free Cash Flow in <br />Net Income</td>
                    {futureYearsData.map((item) => (
                        <td key={item.year}>
                            <p>{item.data.freeCashFlowDividedNetIncome.toFixed(2)}</p>
                        </td>
                    ))}
                </tr>
                <tr>
                    <td>Discount Factor</td>
                    {futureYearsData.map((item) => (
                        <td key={item.year}>
                            <p>{item.data.discountFactor.toFixed(2)}</p>
                        </td>
                    ))}
                </tr>
                <tr>
                    <td>PV</td>
                    {futureYearsData.map((item) => (
                        <td key={item.year}>
                            <p>{(Math.floor(item.data.pv)).toLocaleString()}</p>
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    )
}