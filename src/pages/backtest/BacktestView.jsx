import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { LineChart, TradingViewChart } from "@components";
import { BacktestConfigForm } from "./components";

import { WEB_SOCKET } from "@constants";
import useWebSocket from "@hooks/useWebSocket";

const initialSeries = [
  // {
  //   label: "Index",
  //   xAxis: "date",
  //   yAxis: "totalPnl",
  //   dataSet: [],
  // }
]

function BacktestView(props) {
  const { onSubmit: emitSubmit } = props;
  const [backtestResult] = useWebSocket(WEB_SOCKET.MESSAGE_TYPE.BACKTEST.UPDATE)
  const [series, setSeries] = useState({});

  useEffect(() => {
    const { backtestJobId, params, payload = [] } = backtestResult || {};

    const seriesByJobId = series[backtestJobId];
    const existingDataSet = seriesByJobId?.dataSet || [];
    const updatedSeries = {
      label: params?.file,
      xAxis: "date",
      yAxis: "totalPnl",
      dataSet: [...existingDataSet, ...payload],
    };

    setSeries({ ...series, [backtestJobId]: updatedSeries });
  }, [backtestResult]);

  // const testData = [
  //   { time: "2018-12-22", value: 32.51 },
  //   { time: "2018-12-23", value: 31.11 },
  //   { time: "2018-12-24", value: 27.02 },
  //   { time: "2018-12-25", value: 27.32 },
  //   { time: "2018-12-26", value: 25.17 },
  //   { time: "2018-12-27", value: 28.89 },
  //   { time: "2018-12-28", value: 25.46 },
  //   { time: "2018-12-29", value: 23.92 },
  //   { time: "2018-12-30", value: 22.68 },
  //   { time: "2018-12-31", value: 22.67 },
  // ];

  return (
    <Box sx={{ display: 'flex' }}>
      <LineChart dataSet={Object.values(series)} />
      {/* <TradingViewChart data={testData}></TradingViewChart> */}
      <BacktestConfigForm onSubmit={emitSubmit} onClear={() => setSeries({})} />
    </Box>
  );
}

export default BacktestView;
