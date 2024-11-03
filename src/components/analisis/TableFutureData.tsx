import { FutureYearsDataType } from "@/lib/discounted-free-cash-flow/definitions"

export default function TableFutureData({ futureYearsData }: { futureYearsData: FutureYearsDataType[] }) {
    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    {futureYearsData.map((item) => (
                        <th key={item.year}>{item.year}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Total Revenue</td>
                    {futureYearsData.map((item) => (
                        <td key={item.year}>{(Math.floor(item.data.annualTotalRevenue)).toLocaleString()}</td>
                    ))}
                </tr>
                <tr>
                    <td>Growth Rate</td>
                    {futureYearsData.map((item) => (
                        <td key={item.year}>{(item.data.growthRate * 100).toFixed(2)}%</td>
                    ))}
                </tr>
                <tr>
                    <td>Net Income</td>
                    {futureYearsData.map((item) => (
                        <td key={item.year}>{(Math.floor(item.data.annualNetIncome)).toLocaleString()}</td>
                    ))}
                </tr>
                <tr>
                    <td>Margins</td>
                    {futureYearsData.map((item) => (
                        <td key={item.year}>{(item.data.margins * 100).toFixed(2)}%</td>
                    ))}
                </tr>
                <tr>
                    <td>Free Cash Flow</td>
                    {futureYearsData.map((item) => (
                        <td key={item.year}>{(Math.floor(item.data.annualFreeCashFlow)).toLocaleString()}</td>
                    ))}
                </tr>
                <tr>
                    <td>Free Cash Flow in <br />Net Income</td>
                    {futureYearsData.map((item) => (
                        <td key={item.year}>{item.data.freeCashFlowDividedNetIncome.toFixed(2)}</td>
                    ))}
                </tr>
                <tr>
                    <td>Discount Factor</td>
                    {futureYearsData.map((item) => (
                        <td key={item.year}>{item.data.discountFactor.toFixed(2)}</td>
                    ))}
                </tr>
                <tr>
                    <td>PV</td>
                    {futureYearsData.map((item) => (
                        <td key={item.year}>{(Math.floor(item.data.pv)).toLocaleString()}</td>
                    ))}
                </tr>
            </tbody>
        </table>
    )
}