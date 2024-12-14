import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

function Nifty50() {
  const nifty50 = useSelector((state) => state.marketFeed.nifty50);
  const isPositive = parseInt(nifty50.cng || 0) >= 0;
  const color = isPositive ? "success" : "error";

  const valueWithSign = (value) => {
    const sign = isPositive ? "+" : "";
    return value ? `${sign}${value}` : "00.00";
  };

  return (
    <>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
        color={color}
      >
        {nifty50.iv || "0000.00"}
      </Typography>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
        color={color}
      >
        {valueWithSign(nifty50.cng)} ({valueWithSign(nifty50.nc)} %)
      </Typography>
    </>
  );
}

export default Nifty50;
