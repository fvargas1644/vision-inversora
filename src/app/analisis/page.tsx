import { getCookie, getCrumb, getParams } from "@/lib/yfinance-js/getData";

export default async function AnalysisPage() {
  const getcookie  = await getCookie()
  if(getcookie.cookie){ 
    const crumb = await getCrumb(getcookie.cookie)
    if(crumb){
      const params = await getParams(getcookie.cookie, "AAPL", getcookie.cookie)
      console.log(params)
    }
  } 

  console.log(getcookie.error)

    return (
      <div>
        <p>en page de analisis</p>
      </div>
    );
  }
  