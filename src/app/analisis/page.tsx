import { getParams } from "@/lib/yfinance-js/getData";

export default async function AnalysisPage() {

    const b = await getParams();
    console.log(b)
    return (
      <div>
        en page de analisis
      </div>
    );
  }
  