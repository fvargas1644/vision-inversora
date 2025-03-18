import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";

export default function  PriceChart ({prices, years} : {prices : number[], years : string[]}){
  const options: EChartsOption = {
    title: {
      text: "Proyección de precios",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category", 
      data: years,
    },
    yAxis: {
      type: "value", 
    },
    series: [
      {
        name: "Proyección",
        type: "line",
        data: prices,
        symbol: "circle",
        symbolSize: 10,
        label: {
          show: true,
          position: "top",
          backgroundColor: "#5470c6",
          borderRadius: 10,
          padding: 5,
          color: "#fff",
        },
      },
    ],
  };

  return (
    <div className="card">
      <ReactECharts option={options} style={{ height: 400, width: "100%" }} />
    </div>
  );
};

