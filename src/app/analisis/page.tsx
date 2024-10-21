import { getData } from "@/lib/yfinance-js/getData";

export default async function AnalysisPage() {

    const b = await getData();
    console.log(b)
    return (
      <div>
        en page de analisis
      </div>
    );
  }
  