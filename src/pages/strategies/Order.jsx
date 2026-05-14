import { useState, useEffect } from "react";
import moment from "moment";
import {
  Grid2 as Grid,
  Chip,
  Divider,
} from '@mui/material';
import { PnL, Typography } from "@components";

function Order(props) {
  const { entryOrder: entryOrderFromProps, exitOrder: exitOrderFromProps } = props;

  const [entryOrder, setEntryOrder] = useState(entryOrderFromProps);
  const [exitOrder, setExitOrder] = useState(exitOrderFromProps);

  const currentCandle = entryOrder.currentData?.currentCandle;

  useEffect(() => {
    setEntryOrder(entryOrderFromProps);
  }, [entryOrderFromProps]);

  useEffect(() => {
    setExitOrder(exitOrderFromProps);
  }, [exitOrderFromProps])

  const isOrderClosed = !!exitOrder?.price;

  const renderAmount = (label, value) => {
    const parsedValue = parseFloat(value) || 0;
    return (
      <Typography variant="subtitle2" component="div" sx={{ padding: "0.1rem" }} disabled={isOrderClosed} > {label}: {parsedValue} </Typography>
    );
  }

  const formatDate = (date) =>
    date ? moment(date).format("MMM DD, YYYY") : "--";

  const getTotalCharges = (order) =>
    order ? (parseFloat(order.brokerage) + parseFloat(order.taxes)) : 0;

  const priceDiff = (entryOrder, exitOrder) => {
    const closePrice = exitOrder?.price ? exitOrder.price : currentCandle?.close;

    return entryOrder.tnxType === "BUY"
      ? parseFloat(closePrice) - parseFloat(entryOrder.price)
      : -(parseFloat(closePrice) - parseFloat(entryOrder.price));
  }

  const getPnL = (entryOrder, exitOrder) => priceDiff(entryOrder, exitOrder) * parseInt(entryOrder.quantity);

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
          <Typography variant="subtitle2" component="div" disabled={isOrderClosed}> {orderName(entryOrder)}
            <Chip
              label={entryOrder.tnxType}
              variant="outlined"
              color={entryOrder.tnxType === "BUY" ? "success" : "error"}
              size="small"
              sx={{ margin: "0.5rem" }}
              disabled={isOrderClosed}
            />
          </Typography>
          <Typography variant="subtitle2" component="div" disabled={isOrderClosed}> Exp: {orderExpiry(entryOrder)} </Typography>
        </Grid>

        <Grid item size={3.5}>
          {renderAmount("Entry price", entryOrder.price)}
          {
            exitOrder?.price
              ? renderAmount("Exit price", exitOrder?.price)
              : renderAmount("LTP", currentCandle?.close)
          }
        </Grid>

        <Grid item size={2.5}>
          {renderAmount("Qty", entryOrder.quantity)}
          {renderAmount("Charges", getTotalCharges(entryOrder) + getTotalCharges(exitOrder))}
        </Grid>

        <Grid item size={2.9}>
          <PnL label="P&L" value={getPnL(entryOrder, exitOrder)} disabled={isOrderClosed} />
        </Grid>
      </Grid>
      <Divider />
    </>
  );
}

export default Order;
