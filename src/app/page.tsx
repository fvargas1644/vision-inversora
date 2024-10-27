
import { FinancialPast } from "@/lib/discounted-free-cash-flow/FinancialPast";
import { FinancialFuture } from "@/lib/discounted-free-cash-flow/FinantialFuture";
import { yFinanceQuery } from "@/lib/yfinance-js/getData";

export default async function HomePage() {
  const a = await yFinanceQuery({ query: 'INFO_COMPANY', stock: 'V' })
  console.log(a.data)
  const persona1 = new FinancialFuture('V')
  await persona1.getData()
  await persona1.calculeDataPastYear()
  persona1.calculeDataFutureYear()


  return (
    <div>
      en Page
    </div>
  );
}
