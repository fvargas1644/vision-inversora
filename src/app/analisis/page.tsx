import { getParams } from "@/lib/yfinance-js/getData";

export default async function AnalysisPage() {

    const b = await getParams();
    console.log(b)
    //const a = await fetch('https://query2.finance.yahoo.com/v1/test/getcrumb')
    //console.log(a)
    return (
      <div>
        en page de analisis
      </div>
    );
  }
  