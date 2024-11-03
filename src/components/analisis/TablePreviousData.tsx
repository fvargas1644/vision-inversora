import { PreviousYearsDataType } from "@/lib/discounted-free-cash-flow/definitions"

export default function TablePreviousData({previousYearsData } : {previousYearsData : PreviousYearsDataType[]}){
    return (
        <table>
        <thead>
            <tr>
                <th></th>
                {previousYearsData.map((item) =>(
                    <th key={item.year}>{item.year}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Total Revenue</td>
                {previousYearsData.map((item) =>(
                    <td key={item.year}>{item.data.annualTotalRevenue.toLocaleString()}</td>
                ))}
            </tr>
            <tr>
                <td>Growth Rate</td>
                {previousYearsData.map((item) =>(
                    <td key={item.year}>{(item.data.growthRate * 100).toFixed(2)}%</td>
                ))}
            </tr>
            <tr>
                <td>Net Income</td>
                {previousYearsData.map((item) =>(
                    <td key={item.year}>{item.data.annualNetIncome.toLocaleString()}</td>
                ))}
            </tr>
            <tr>
                <td>Margins</td>
                {previousYearsData.map((item) =>(
                    <td key={item.year}>{(item.data.margins * 100).toFixed(2)}%</td>
                ))}
            </tr>
            <tr>
                <td>Free Cash Flow</td>
                {previousYearsData.map((item) =>(
                    <td key={item.year}>{item.data.annualFreeCashFlow.toLocaleString()}</td>
                ))}
            </tr>
            <tr>
                <td>Free Cash Flow in <br />Net Income</td>
                {previousYearsData.map((item) =>(
                    <td key={item.year}>{item.data.freeCashFlowDividedNetIncome.toFixed(2)}</td>
                ))}
            </tr>
        </tbody>
    </table>
    )
}