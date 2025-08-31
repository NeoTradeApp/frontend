import { useState, useEffect } from "react";
import { LineChart as MuiLineChart } from '@mui/x-charts/LineChart';

const margin = { right: 24 };

const seriesOptions = {
  area: false,
  showMark: true,
  curve: "linear",
}

function LineChart(props) {
  const { dataSet = [] } = props;

  const [xData, setXData] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const chartData = dataSet.reduce((obj, line) => {
      const { label, dataSet: lineDataSet, xAxis, yAxis } = line;

      const chartSeries = lineDataSet.reduce((obj, set) => {
        obj.xData.push(set[xAxis]);
        obj.yData.push(set[yAxis]);

        return obj;
      }, { xData: [], yData: [] });

      if (!obj.xData.length) obj.xData = chartSeries.xData;

      obj.series.push({ label, ...seriesOptions, data: chartSeries.yData });

      return obj;
    }, { xData: [], series: [] });

    setXData(chartData.xData);
    setSeries(chartData.series);
  }, [dataSet]);

  return (
    <MuiLineChart
      height={300}
      series={series}
      xAxis={[{ scaleType: 'point', data: xData }]}
      margin={margin}
    />
  )
}

export default LineChart;
