import React from "react";
import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";

const PriceChart: React.FC = () => {
  const options: EChartsOption = {
    title: {
      text: "Proyección de precios",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category", 
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value", 
    },
    series: [
      {
        name: "Proyección",
        type: "line",
        data: [620, 732, 601, 934, 720, 717, 620],
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

  return <ReactECharts option={options} style={{ height: 400, width: "100%" }} />;
};

export default PriceChart;

