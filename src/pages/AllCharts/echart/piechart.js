import React from "react"
import ReactEcharts from "echarts-for-react"
import getChartColorsArray from "../../../components/Common/ChartsDynamicColor"

const Pie = ({ dataColors }) => {
  const PieEChartColors = getChartColorsArray(dataColors)
  const options = {
    toolbox: {
      show: false,
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: ["Student", "Colleges", "Coaching", "Companies"],
      textStyle: {
        color: ["#8791af"],
      },
    },
    color: PieEChartColors,
    series: [
      {
        name: "Total sales",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: [
          { value: 335, name: "Student" },
          { value: 310, name: "Colleges" },
          { value: 234, name: "Coaching" },
          { value: 135, name: "Companies" },
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  }
  return (
    <React.Fragment>
      <ReactEcharts style={{ height: "350px" }} option={options} />
    </React.Fragment>
  )
}
export default Pie
