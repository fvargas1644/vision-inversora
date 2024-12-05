import { fetchCompanyTickersExchange } from "@/lib/sec-edgar/fetchData";

export default async function HomePage() {

  const a = await fetchCompanyTickersExchange()

  return (
    <div>
      en Page
    </div>
  );
}
