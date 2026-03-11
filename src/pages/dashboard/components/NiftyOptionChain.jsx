import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
} from "@mui/material";
import { formatVolume } from "@utils";

function OptionChain() {
  const nifty50 = useSelector((state) => state.marketFeed.nifty50);
  const niftyOptionChainState = useSelector((state) => state.marketFeed.niftyOptionChain);
  const niftyOptionChain = { ...niftyOptionChainState };

  if (nifty50.currentPrice) {
    niftyOptionChain[nifty50.currentPrice] = {
      isSpot: true,
      ...nifty50,
    };
  }

  const colorByValue = (value) => {
    const isPositive = parseInt(value || 0) >= 0;
    return isPositive ? "success" : "error";
  };

  const valueWithSign = (value) => {
    const isPositive = parseInt(value || 0) >= 0;
    const sign = isPositive ? "+" : "";
    return value ? `${sign}${value}` : "00.00";
  };

  const renderOI = (oi, color, flipHorizontal = false) => {
    const percentageOI = ((oi || 0) * 100) / 10000000;

    return (
      <>
        {formatVolume(oi) || "--"}
        <Box sx={{ width: '100%', transform: `scaleX(${flipHorizontal ? -1 : 1})`, marginTop: "0.5rem"}}>
          <LinearProgress variant="determinate" value={percentageOI} color={color} />
        </Box>
      </>
    );
  }

  const renderOption = (strike) => {
    const option = niftyOptionChain[strike];
    if (!option) return;

    return (
      <>
        <TableCell colSpan={2} align="left"> {renderOI(option?.CE?.openInterest, colorByValue(option?.CE?.change))} </TableCell>
        <TableCell align="left"> {renderPrice(option.CE)} </TableCell>

        <TableCell align="center"> {strike} </TableCell>

        <TableCell align="right"> {renderPrice(option.PE)} </TableCell>
        <TableCell colSpan={2} align="right"> {renderOI(option?.PE?.openInterest, colorByValue(option?.PE?.change), true)} </TableCell>
      </>
    );
  };

  const renderSpot = (strike) => {
    const spot = niftyOptionChain[strike];
    if (!spot) return;

    return (
      <TableCell colSpan={7} align="center">
        <Box sx={{
          border: "solid 1px rgba(255,255,255,0.3)",
          borderRadius: "30px",
        }}>
          {renderPrice(spot)}
        </Box>
      </TableCell>
    )
  }

  const renderPrice = (option) => {
    if (!option) return;

    return (
      <>
        <Typography
          component="div"
          sx={{ flexGrow: 1 }}
          color={colorByValue(option.change)}
          size="small"
        >
          {option.currentPrice}
        </Typography>
        <Typography
          color={colorByValue(option.change)}
          variant="caption"
          size="small"
        >
          {valueWithSign(option.change)} ({valueWithSign(option.changePercentage)}%)
        </Typography>
      </>
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">CALL OI</TableCell>
            <TableCell align="left"></TableCell>

            <TableCell align="left">CALL LTP</TableCell>
            <TableCell align="center">STRIKE</TableCell>
            <TableCell align="right">PUT LTP</TableCell>

            <TableCell align="right">PUT OI</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(niftyOptionChain).sort((a, b) => b - a).map((strike) => (
            <TableRow key={strike}>
              {niftyOptionChain[strike]?.isSpot ? renderSpot(strike) : renderOption(strike)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OptionChain;
