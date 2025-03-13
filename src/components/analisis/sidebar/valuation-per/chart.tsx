import React from "react";
import ReactECharts from "echarts-for-react";

const LineChart = () => {
  const option = {
    title: {
      text: "Line Chart",
      subtext: "Subtitle here",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Group 1", "Group 2", "Group 3"],
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
        name: "Group 1",
        type: "line",
        data: [620, 732, 601, 934, 720, 717, 620],
        symbol: "circle",
        symbolSize: 10,
        label: {
          show: true,
          position: "top",
        },
      },
      {
        name: "Group 2",
        type: "line",
        data: [500, 410, 560, 580, 470, 459, 480],
        symbol: "circle",
        symbolSize: 10,
      },
      {
        name: "Group 3",
        type: "line",
        data: [330, 200, 180, 290, 210, 218, 260],
        symbol: "circle",
        symbolSize: 10,
        label: {
          show: true,
          position: "top",
          backgroundColor: "#FFD700",
          borderRadius: 10,
          padding: 5,
          color: "#fff",
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: "400px" }} />;
};

export default LineChart;
