import getFinancialData from "@/lib/discounted-free-cash-flow/getData";

export default async function HomePage() {

  await getFinancialData('AAPL')

  return (
    <div>
      en Page
    </div>
  );
}
