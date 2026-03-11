import { useSelector } from "react-redux";
import moment from "moment";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  LinearProgress,
  Grid2 as Grid,
} from "@mui/material";
import { formatVolume } from "@utils";

function Nifty50FutCard() {
  const nifty50Fut = useSelector((state) => state.marketFeed.nifty50Fut);
  const isPositive = parseInt(nifty50Fut.change || 0) >= 0;
  const color = isPositive ? "success" : "error";

  const valueWithSign = (value) => {
    const sign = isPositive ? "+" : "";
    return value ? `${sign}${value}` : "00.00";
  };

  const formattedExpiryDate = () =>
    moment(nifty50Fut.expiry).format("MMM YYYY").toUpperCase();


  const renderVolume = (volume) => {
    const percentageOI = ((volume || 0) * 100) / 10000000;

    return (
      <>
        {formatVolume(volume) || "--"}
        <Box sx={{ width: '100%', transform: "scaleX(-1)", marginTop: "0.5rem" }}>
          <LinearProgress variant="determinate" value={percentageOI} color="success" />
        </Box>
      </>
    );
  }

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item size={10}>
            <Typography variant="h5" component="div">
              Nifty 50 Futures {" "}
              <Chip label={formattedExpiryDate()} variant="outlined" />
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              color={color}
            >
              {nifty50Fut.currentPrice || "0000.00"}
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              color={color}
            >
              {valueWithSign(nifty50Fut.change)} ({valueWithSign(nifty50Fut.changePercentage)} %)
            </Typography>
          </Grid>
          <Grid item size={2}>
            Volume {renderVolume(nifty50Fut.volume)}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Nifty50FutCard;
