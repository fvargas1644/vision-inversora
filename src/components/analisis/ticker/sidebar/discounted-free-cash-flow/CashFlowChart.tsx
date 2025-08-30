import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";
import { DiscontedFreeCashFlowFinancialData, DiscontedFreeCashFlowPredictionsData } from "@/lib/types/discountedFreeCashFlow";

interface CashFlowChartProps {
  financialData: DiscontedFreeCashFlowFinancialData[];
  predictionsData: DiscontedFreeCashFlowPredictionsData[];
}

export default function CashFlowChart({ financialData, predictionsData }: CashFlowChartProps) {
  // Extract historical data
  const historicalYears = financialData.map(item => item.year.toString());
  const historicalCashFlow = financialData.map(item => item.data.annualFreeCashFlow);
  
  // Extract prediction data
  const predictionYears = predictionsData.map(item => item.year.toString());
  const predictionCashFlow = predictionsData.map(item => item.data.annualFreeCashFlow);
  
  // Combine years for x-axis
  const allYears = [...historicalYears, ...predictionYears];
  
  const options: EChartsOption = {
    title: {
      text: "Proyección de Flujo de Efectivo Libre",
    },
    tooltip: {
      trigger: "axis",
      formatter: (params: Array<{axisValue: string, seriesName: string, value: number}>) => {
        let result = `<strong>${params[0].axisValue}</strong><br/>`;
        params.forEach((param) => {
          const value = (param.value / 1000000).toFixed(2); // Convert to millions
          result += `${param.seriesName}: $${value}M<br/>`;
        });
        return result;
      }
    },
    legend: {
      data: ['Histórico', 'Proyección']
    },
    xAxis: {
      type: "category", 
      data: allYears,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: (value: number) => `$${(value / 1000000).toFixed(0)}M`
      }
    },
    series: [
      {
        name: "Histórico",
        type: "line",
        data: [...historicalCashFlow, ...Array(predictionYears.length).fill(null)],
        symbol: "circle",
        symbolSize: 8,
        lineStyle: {
          color: "#1f77b4",
          width: 3
        },
        itemStyle: {
          color: "#1f77b4"
        },
        label: {
          show: false
        },
      },
      {
        name: "Proyección",
        type: "line",
        data: [...Array(historicalYears.length).fill(null), ...predictionCashFlow],
        symbol: "circle",
        symbolSize: 8,
        lineStyle: {
          color: "#ff7f0e",
          type: "dashed",
          width: 3
        },
        itemStyle: {
          color: "#ff7f0e"
        },
        label: {
          show: false
        },
      },
    ],
  };

  return (
    <div className="card">
      <ReactECharts option={options} style={{ height: 400, width: "100%" }} />
    </div>
  );
}