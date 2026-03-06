import { useSelector } from "react-redux";
import { Card, CardContent, Typography } from "@mui/material";

function Nifty50Card() {
  const nifty50 = useSelector((state) => state.marketFeed.nifty50);
  const isPositive = parseInt(nifty50.change || 0) >= 0;
  const color = isPositive ? "success" : "error";

  const valueWithSign = (value) => {
    const sign = isPositive ? "+" : "";
    return value ? `${sign}${value}` : "00.00";
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Nifty 50
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          color={color}
        >
          {nifty50.currentPrice || "0000.00"}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          color={color}
        >
          {valueWithSign(nifty50.change)} ({valueWithSign(nifty50.changePercentage)} %)
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Nifty50Card;
