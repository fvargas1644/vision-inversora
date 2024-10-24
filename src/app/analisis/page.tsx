import { yFinanceQuery } from "@/lib/yfinance-js/getData";


export default async function AnalysisPage() {
  const query  = await yFinanceQuery('DISCOUNTED_FREE_CASH_FLOW')
  if(query.data){
    console.log(query.data)
  } else {
    console.log(query.error)
  }
  
    return (
      <div>
        <p>en page de analisis</p>
      </div>
    );
  }
  