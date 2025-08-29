import { Box } from "@mui/material";
import { LineChart } from "@components";

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
      {
        time: "June 2, 2025",
        pnl: 500
      },
      {
        time: "June 3, 2025",
        pnl: 1000
      },
      {
        time: "June 4, 2025",
        pnl: 1100
      },
      {
        time: "June 5, 2025",
        pnl: 1150
      },
      {
        time: "June 6, 2025",
        pnl: 950
      }
    ]
  }
]

function BacktestView() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <LineChart dataSet={testSeries} />
    </Box>
  );
}

export default BacktestView;
