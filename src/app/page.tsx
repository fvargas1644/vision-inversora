
import { FinancialPast } from "@/lib/discounted-free-cash-flow/FinancialPast";
import { FinancialFuture } from "@/lib/discounted-free-cash-flow/FinantialFuture";

export default async function HomePage() {
  //const a = await rate('AAPL')
  const persona1 = new FinancialFuture('AAPL')
  await persona1.getData()
  await persona1.calculeDataPastYear()
  console.log(persona1.getDataPastYears())


  return (
    <div>
      en Page
    </div>
  );
}
