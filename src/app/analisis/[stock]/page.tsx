import { Header } from "@/components/analisis/Header";
import getFinancialData from "@/lib/discounted-free-cash-flow/getData";

export default async function StockAnalysisPage({ params }: { params: { stock: string } }) {
    const  {
        previousYearsData,
        futureYearsData,
        intrinsicPrice,
        stockPrice
    } = await getFinancialData(params.stock)

    console.log(futureYearsData)

    return (
        <>
            <Header
                stockName={params.stock}
                stockPrice={stockPrice}
                stockintrinsicPrice={Math.floor(intrinsicPrice * 100)/100}
            />

            <table>
                <thead>
                    <tr>
                        {previousYearsData.map((item) =>(
                            <th key={item.year}>{item.year}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {previousYearsData.map((item) =>(
                            <td key={item.year}>{item.data.annualNetIncome.toLocaleString()}</td>
                        ))}
                    </tr>
                    <tr>
                        {previousYearsData.map((item) =>(
                            <td key={item.year}>{item.data.annualFreeCashFlow.toLocaleString()}</td>
                        ))}
                    </tr>
                    <tr>
                        {previousYearsData.map((item) =>(
                            <td key={item.year}>{item.data.annualTotalRevenue.toLocaleString()}</td>
                        ))}
                    </tr>
                    <tr>
                        {previousYearsData.map((item) =>(
                            <td key={item.year}>{(item.data.growthRate * 100).toFixed(2)}%</td>
                        ))}
                    </tr>
                    <tr>
                        {previousYearsData.map((item) =>(
                            <td key={item.year}>{(item.data.margins * 100).toFixed(2)}%</td>
                        ))}
                    </tr>
                    <tr>
                        {previousYearsData.map((item) =>(
                            <td key={item.year}>{item.data.freeCashFlowDividedNetIncome.toFixed(2)}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </>
    )
}