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
} from "@mui/material";

function OptionChain() {
  const nifty50 = useSelector((state) => state.marketFeed.nifty50);
  const niftyOptionChain = useSelector((state) => state.marketFeed.niftyOptionChain);

  const groupedByStrikePrice = niftyOptionChain
    .reduce((groupByStrikePrice, option) => {
      const { strikePrice, optionType } = option;

      groupByStrikePrice[strikePrice] ||= {};
      groupByStrikePrice[strikePrice][optionType] ||= {};
      groupByStrikePrice[strikePrice][optionType] = option;

      return groupByStrikePrice;
    }, {});

  if (nifty50.currentPrice) {
    groupedByStrikePrice[nifty50.currentPrice] = {
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

  const formatNumberIndian = (num) => {
    if (num >= 10000000) return (num / 10000000).toFixed(1) + 'Cr';
    if (num >= 100000) return (num / 100000).toFixed(1) + 'L';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';

    return num;
  };

  const renderOption = (strike) => {
    const option = groupedByStrikePrice[strike];

    return (
      <>
        <TableCell align="left"> {formatNumberIndian(option.CE.openInterest)} </TableCell>
        <TableCell align="left"> {renderPrice(option.CE)} </TableCell>

        <TableCell align="center">{strike}</TableCell>

        <TableCell align="right"> {renderPrice(option.PE)} </TableCell>
        <TableCell align="right"> {formatNumberIndian(option.PE.openInterest)} </TableCell>
      </>
    );
  };

  const renderSpot = (strike) => {
    const spot = groupedByStrikePrice[strike];

    return (
      <TableCell colSpan={5} align="center">
        <Box sx={{
          border: "solid 1px rgba(255,255,255,0.3)",
          borderRadius: "30px",
        }}>
          {renderPrice(spot)}
        </Box>
      </TableCell>
    )
  }

  const renderPrice = (option) => (
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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">CALL OI</TableCell>
            <TableCell align="left">CALL LTP</TableCell>
            <TableCell align="center">STRIKE</TableCell>
            <TableCell align="right">PUT LTP</TableCell>
            <TableCell align="right">PUT OI</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(groupedByStrikePrice).sort().map((strike) => (
            <TableRow key={strike}>
              {groupedByStrikePrice[strike]?.isSpot ? renderSpot(strike) : renderOption(strike)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OptionChain;
