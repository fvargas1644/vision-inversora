import { getCookie } from "@/lib/yfinance-js/getData";

export default async function AnalysisPage() {
  const cookie = await getCookie()

    return (
      <div>
        <p>en page de analisis</p>
        <p>{cookie}</p>
      </div>
    );
  }
  