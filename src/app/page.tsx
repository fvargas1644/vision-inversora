
import { FinancialPast } from "@/lib/discounted-free-cash-flow/FinancialPast";
import { FinancialFuture } from "@/lib/discounted-free-cash-flow/FinantialFuture";

export default async function HomePage() {
  //const a = await rate('AAPL')
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
