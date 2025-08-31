import { Box } from "@mui/material";
import { LineChart } from "@components";
import { BacktestConfigForm } from "./components";

const testSeries = [
  {
    label: "2023",
    xAxis: "time",
    yAxis: "pnl",
    dataSet: [
      {
        time: "June 1, 2025",
        pnl: 350
      },
    ]
  }
]

function BacktestView(props) {
  const { onSubmit: emitSubmit } = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <BacktestConfigForm onSubmit={emitSubmit} />
      <LineChart dataSet={testSeries} />
    </Box>
  );
}

export default BacktestView;
