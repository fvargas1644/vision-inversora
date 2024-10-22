'use client'
import { useYFinanceContext } from "@/context/yFinance";

export default function AnalysisPage() {
  const {YFinanceData, setYFinanceData}= useYFinanceContext();
   
    return (
      <div>
        {YFinanceData.cookie}
        en page de analisis
      </div>
    );
  }
  