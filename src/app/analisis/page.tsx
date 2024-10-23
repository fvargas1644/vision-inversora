import { getCookie, getCrumb, getParams, getWacc } from "@/lib/yfinance-js/getData";

export default async function AnalysisPage() {
  const getcookie  = await getCookie()
  if(getcookie.cookie){ 
    const crumb = await getCrumb(getcookie.cookie)
    if(crumb){
      const params = await getParams(getcookie.cookie, "AAPL", getcookie.cookie)
      const wacc = await getWacc()
      //console.log(wacc)
    }
  } 

    return (
      <div>
        <p>en page de analisis</p>
      </div>
    );
  }
  