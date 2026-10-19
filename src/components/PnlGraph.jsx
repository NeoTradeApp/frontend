import { useState } from "react";
import moment from "moment";
import { LineChart } from "@mui/x-charts/LineChart";
import { FormControlLabel, Checkbox, Box } from "@mui/material";


export default function PnlGraph(props) {
  const { metrics } = props;
  const [includeCharges, setIncludeCharges] = useState(true);

  const toNumber = (n) => Number(n) || 0;

  let sum = 0;
  const dataset = (metrics?.positions || [])
    .sort((a, b) => new Date(a.exitTime) - new Date(b.exitTime))
    .filter(p => p.pnl !== null && !isNaN(p.pnl) && p.status === "CLOSED")
    .map((p, index) => {
      sum += toNumber(p.pnl);
      if (includeCharges) {
        const charges = (p?.orders || []).reduce((s, o) => s + toNumber(o.brokerage) + toNumber(o.taxes), 0);
        sum += -charges;
      }

      return {
        date: moment(p.exitTime),
        pnl: sum,
        zeroRef: 0,
      }
    });

  const handleIncludeChargesChange = (event) =>
    setIncludeCharges(event.target?.checked);


  return (
    <Box sx={{ position: "relative" }}>
      <FormControlLabel
        sx={{ position: "absolute", left: "10rem" }}
        value="end"
        control={<Checkbox checked={includeCharges} onChange={handleIncludeChargesChange} />}
        label="Include Charges"
        labelPlacement="end"
      />
      <LineChart
        dataset={dataset}
        xAxis={[
          {
            data: dataset.map((_, index) => index),
            scaleType: "point",
            valueFormatter: (index) => {
              const item = dataset[index];
              const formattedDate = moment(item.date).format("MMM D, YYYY HH:mm");
              const orderNumber = `Order No.: #${index + 1}`;
              return item ?  [formattedDate, orderNumber].join(" | ") : "";
            },
            tickLabelStyle: { display: "none" },
          },
        ]}
        series={[
          {
            dataKey: "pnl",
            label: "P&L",
            curve: "linear",
            showMark: false,
          },
          {
            dataKey: "zeroRef",
            label: "Baseline",
            curve: "linear",
            showMark: false,
            color: "red",
          },
        ]}
        height={300}
      />
    </Box>
  );
};
