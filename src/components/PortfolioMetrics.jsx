import {
  Grid2 as Grid,
} from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';

const settings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

export default function PortfolioMetrics(props) {
  const { metrics } = props;

  const pieChartData = [
    { label: "Winning probability (%)", value: (metrics.winRatePercent || 0).toFixed(2), color: "#66bb6a" },
    { label: "Lossing probability (%)", value: (metrics.lossRatePercent || 0).toFixed(2), color: "#f44336" },
  ];

  const lineChartData = [0];
  let sum = 0;
  (metrics.pnls || []).forEach((pnl) => {
    sum += pnl;
    lineChartData.push(sum);
  }, []);

  return (
    <Grid container spacing={6}>
      <Grid item size={6}>
        <PieChart
          series={[{ innerRadius: 60, outerRadius: 100, data: pieChartData, arcLabel: 'value' }]}
          {...settings}
        />
      </Grid>

      <Grid item size={6}>
        <LineChart
          yAxis={[
            { tickLabelStyle: { display: "none" }, tickSize: 0, }
          ]}
          series={[
            { curve: "linear", showMark: false, data: lineChartData },
          ]}
        />
      </Grid>
    </Grid>
  );
}
