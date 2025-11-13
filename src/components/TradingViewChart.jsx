import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { AreaSeries, createChart, ColorType } from "lightweight-charts";

const TradingViewChart = function(props) {
  const {
    data,
    colors: {
      backgroundColor = "white",
      lineColor = "#2962FF",
      textColor = "black",
      areaTopColor = "#2962FF",
      areaBottomColor = "rgba(41, 98, 255, 0.28)",
    } = {},
  } = props;

  const chartContainerRef = useRef();

  useEffect(
    () => {
      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      };

      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor },
          textColor,
        },
        width: chartContainerRef.current.clientWidth,
        height: 300,
      });
      chart.timeScale().fitContent();

      const newSeries = chart.addSeries(AreaSeries, { lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
      newSeries.setData(data);

      window.addEventListener("resize", handleResize);
      console.log("CHART", chart);

      return () => {
        window.removeEventListener("resize", handleResize);

        chart.remove();
      };
    },
    [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
  );

  return (
    <>
    <h1> TEST </h1>
    <div
      ref={chartContainerRef}
    />
    </>
  );
};

export default TradingViewChart;
