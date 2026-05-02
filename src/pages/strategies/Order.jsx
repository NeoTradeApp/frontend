import { useState, useEffect } from "react";
import {
  Typography,
  Grid2 as Grid,
  Chip,
  Divider,
} from '@mui/material';
import PnL from './components/PnL';

function Order(props) {
  const { order: orderFromProps } = props;
  const [order, setOrder] = useState(orderFromProps);

  const currentCandle = order.candleData?.currentCandle;

  useEffect(() => {
    setOrder(orderFromProps);
  }, [orderFromProps])

  const renderAmount = (label, value) => {
    const parsedValue = parseFloat(value) || 0;
    return (
      <Typography variant="subtitle2" component="div" sx={{ padding: "0.1rem" }} > {label}: {parsedValue} </Typography>
    );
  }

  const getTotalCharges = (order) =>
    parseFloat(order.brokerage) + parseFloat(order.taxes);

  const priceDiff = (order) => order.tnxType === "BUY"
    ? parseFloat(currentCandle?.close) - parseFloat(order.price)
    : -(parseFloat(currentCandle?.close) - parseFloat(order.price));

  const getPnL = (order) => priceDiff(order) * parseInt(order.quantity);

  return (
    <>
      <Grid container spacing={12} sx={{ padding: "1rem" }}>
        <Grid item size={3}>
          <Typography variant="subtitle2" component="div"> {order.name} </Typography>
          <Chip
            label={order.tnxType}
            variant="outlined"
            color={order.tnxType === "BUY" ? "success" : "error"}
            size="small"
          />
        </Grid>

        <Grid item size={3}>
          {renderAmount("Price", order.price)}
          {renderAmount("LTP", currentCandle?.close)}
        </Grid>

        <Grid item size={3}>
          {renderAmount("Qty", order.quantity)}
          {renderAmount("Charges", getTotalCharges(order))}
        </Grid>

        <Grid item size={3}>
          <PnL label="P&L" value={getPnL(order)} />
        </Grid>
      </Grid>
      <Divider />
    </>
  );
}

export default Order;
