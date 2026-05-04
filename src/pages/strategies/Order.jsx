import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import {
  Typography,
  Grid2 as Grid,
  Chip,
  Divider,
} from '@mui/material';
import { updateOrder } from "@redux";
import { PnL } from "@components";

function Order(props) {
  const { order: orderFromProps } = props;
  const [order, setOrder] = useState(orderFromProps);

  const dispatch = useDispatch();

  const currentCandle = order.currentData?.currentCandle;

  useEffect(() => {
    setOrder(orderFromProps);
  }, [orderFromProps])

  useEffect(() => {
    dispatch(updateOrder(order));
  }, [order]);

  const renderAmount = (label, value) => {
    const parsedValue = parseFloat(value) || 0;
    return (
      <Typography variant="subtitle2" component="div" sx={{ padding: "0.1rem" }} > {label}: {parsedValue} </Typography>
    );
  }

  const formatDate = (date) =>
    date ? moment(date).format("MMM DD, YYYY") : "--";

  const getTotalCharges = (order) =>
    parseFloat(order.brokerage) + parseFloat(order.taxes);

  const priceDiff = (order) => order.tnxType === "BUY"
    ? parseFloat(currentCandle?.close) - parseFloat(order.price)
    : -(parseFloat(currentCandle?.close) - parseFloat(order.price));

  const getPnL = (order) => priceDiff(order) * parseInt(order.quantity);

  const orderName = (order) => {
    const [strike, type] = order.name.split(" ");
    return [strike, type].join(" ");
  };

  const orderExpiry = (order) => {
    const [, , expiry] = order.name.split(" ");
    return formatDate(expiry);
  };

  return (
    <>
      <Grid container spacing={12} sx={{ padding: "1rem" }}>
        <Grid item size={3.1}>
          <Typography variant="subtitle2" component="div"> {orderName(order)}
            <Chip
              label={order.tnxType}
              variant="outlined"
              color={order.tnxType === "BUY" ? "success" : "error"}
              size="small"
              sx={{ margin: "0.5rem" }}
            />
          </Typography>
          <Typography variant="subtitle2" component="div"> Exp: {orderExpiry(order)} </Typography>
        </Grid>

        <Grid item size={3}>
          {renderAmount("Price", order.price)}
          {renderAmount("LTP", currentCandle?.close)}
        </Grid>

        <Grid item size={3}>
          {renderAmount("Qty", order.quantity)}
          {renderAmount("Charges", getTotalCharges(order))}
        </Grid>

        <Grid item size={2.9}>
          <PnL label="P&L" value={getPnL(order)} />
        </Grid>
      </Grid>
      <Divider />
    </>
  );
}

export default Order;
