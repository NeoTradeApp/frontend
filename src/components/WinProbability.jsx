import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import { formattedAmount } from "@utils";

const settings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

export default function WinProbability(props) {
  const { metrics } = props;

  const pieChartData = [
    { label: "Winning Rate (%)", value: formattedAmount(metrics.winRatePercent), color: "#66bb6a" },
    { label: "Lossing Rate (%)", value: formattedAmount(metrics.lossRatePercent), color: "#f44336" },
  ];

  return (
    <>
      <Typography variant="subtitle2" component="span"> Win Rate </Typography>
      <PieChart
        series={[{ innerRadius: 50, outerRadius: 100, data: pieChartData, arcLabel: 'value' }]}
        {...settings}
      />
    </>
  );
}
