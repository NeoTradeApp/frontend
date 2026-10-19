import { useSelector } from "react-redux";
import { Card, CardContent, Typography } from "@mui/material";
import { formattedAmount } from "@utils"

function Nifty50Card() {
  const nifty50 = useSelector((state) => state.marketFeed.nifty50);
  const isPositive = parseInt(nifty50.change || 0) >= 0;
  const color = isPositive ? "success" : "error";

  const valueWithSign = (value) => {
    const sign = isPositive ? "+" : "";
    return value ? `${sign}${formattedAmount(value)}` : "00.00";
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
          {formattedAmount(nifty50.currentPrice)}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          color={color}
        >
          {valueWithSign(formattedAmount(nifty50.change))} ({valueWithSign(nifty50.changePercentage)} %)
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Nifty50Card;
