import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

function Nifty50() {
  const nifty50 = useSelector((state) => state.marketFeed.nifty50);
  const color = parseInt(nifty50.cng) > 0 ? "success" : "error";

  return (
    <>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
        color={color}
      >
        {nifty50.iv}
      </Typography>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
        color={color}
      >
        {nifty50.cng} ({nifty50.nc}%)
      </Typography>
    </>
  );
}

export default Nifty50;
