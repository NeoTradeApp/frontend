import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import {
  Box,
  // Typography,
  Grid2 as Grid,
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  accordionSummaryClasses,
  AccordionDetails as MuiAccordionDetails,
  Chip,
  Divider,
} from '@mui/material';
import { PnL, Typography } from "@components";
import Order from "./Order";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: "1rem",
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
  {
    transform: 'rotate(90deg)',
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function Position(props) {
  const { position: positionFromProps } = props;
  const positionId = positionFromProps?.id;

  const [position, setPosition] = useState(positionFromProps);
  const isPositionActive = position?.status === "ACTIVE";
  const isPositionClosed = position?.status === "CLOSED";

  useEffect(() => {
    setPosition(positionFromProps);
  }, [positionFromProps]);

  const livePosition = useSelector((state) => state.portfolio.positions[positionId]);
  useEffect(() => {
    if (livePosition?.id) {
      setPosition(livePosition);
    }
  }, [livePosition]);

  const formatStatus = (status) =>
    <Chip
      label={status}
      variant="outlined"
      color={isPositionActive ? "success" : "error"}
      size="small"
      sx={{ margin: "0.5rem" }}
    />;

  const formatDateTime = (datetime) =>
    datetime ? moment(datetime).format("MMM DD, HH:mm:ss") : "--:--:--";

  const pairedOrders = Object.values(position.orders)
    .reduce((obj, order) => {
      const key = order.parentId || order.id;
      const orderType = order.parentId ? "exitOrder" : "entryOrder";

      obj[key] ||= {};
      obj[key][orderType] = order;

      return obj;
    }, {});

  return (
    <Accordion>
      <AccordionSummary aria-controls={`${positionId}-content`} id={`${positionId}-header`}>
        <Box sx={{ flexGrow: 1, marginLeft: "2rem" }}>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={12}>
              <Grid item size={5}>
                <Typography variant="subtitle1" component="span" disabled={isPositionClosed}> {position.name} </Typography>
                {formatStatus(position.status)}
              </Grid>
              <Grid item size={3.5}>
                <Typography variant="subtitle2" component="div" disabled={isPositionClosed}> {"Entry at"} </Typography>
                <Typography variant="subtitle1" component="div" disabled={isPositionClosed}> {formatDateTime(position.entryTime)} </Typography>
              </Grid>
              <Grid item size={3.5}>
                <Typography variant="subtitle2" component="div" disabled={isPositionClosed}> {"Exit at"} </Typography>
                <Typography variant="subtitle1" component="div" disabled={isPositionClosed}> {formatDateTime(position.exitTime)} </Typography>
              </Grid>
            </Grid>
          </Box>

          <Divider />

          <Box sx={{ p: 2 }}>
            <Grid container spacing={12}>
              <Grid item size={3.1}>
                <PnL label="Realised P&L" value={isPositionClosed ? position.pnl : 0} disabled={isPositionClosed} />
              </Grid>

              <Grid item size={3}>
                <PnL label="Unrealised P&L" value={isPositionActive ? position.pnl : 0} disabled={isPositionClosed} />
              </Grid>

              <Grid item size={3}>
                <PnL label="Target" value={position.target} disabled={isPositionClosed} />
              </Grid>

              <Grid item size={2.9}>
                <PnL label="Stoploss" value={position.stoploss} disabled={isPositionClosed} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ textAlign: "left" }}>
        {
          Object.values(pairedOrders).map(({ entryOrder, exitOrder }, index) =>
            <Order key={index} entryOrder={entryOrder} exitOrder={exitOrder} />
          )
        }
      </AccordionDetails>
    </Accordion>
  );
}

export default Position;
