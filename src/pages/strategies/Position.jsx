import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import {
  Box,
  Typography,
  Grid2 as Grid,
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  accordionSummaryClasses,
  AccordionDetails as MuiAccordionDetails,
  Chip,
  Divider,
} from '@mui/material';
import { updatePosition } from "@redux";
import { PnL } from "@components";
import Order from "./Order";

import { WEB_SOCKET } from "@constants";
import useWebSocket from "@hooks/useWebSocket";

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

  const dispatch = useDispatch();

  const [position, setPosition] = useState(positionFromProps);
  const isPositionActive = position?.status === "ACTIVE";
  const isPositionClosed = position?.status === "CLOSED";

  useEffect(() => {
    setPosition(positionFromProps);
  }, [positionFromProps]);

  const [livePosition] = useWebSocket(WEB_SOCKET.MESSAGE_TYPE.POSITION.UPDATE(positionId));
  useEffect(() => {
    if (livePosition?.id) {
      setPosition(livePosition);
    }
  }, [livePosition]);

  useEffect(() => {
    dispatch(updatePosition(position))
  }, [position]);

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

  return (
    <Accordion>
      <AccordionSummary aria-controls={`${positionId}-content`} id={`${positionId}-header`}>
        <Box sx={{ flexGrow: 1, marginLeft: "2rem" }}>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={12}>
              <Grid item size={5}>
                <Typography variant="subtitle1" component="span"> {position.name} </Typography>
                {formatStatus(position.status)}
              </Grid>
              <Grid item size={3.5}>
                <Typography variant="subtitle2" component="div"> {"Entry at"} </Typography>
                <Typography variant="subtitle1" component="div"> {formatDateTime(position.entryTime)} </Typography>
              </Grid>
              <Grid item size={3.5}>
                <Typography variant="subtitle2" component="div"> {"Exit at"} </Typography>
                <Typography variant="subtitle1" component="div"> {formatDateTime(position.exitTime)} </Typography>
              </Grid>
            </Grid>
          </Box>

          <Divider />

          <Box sx={{ p: 2 }}>
            <Grid container spacing={12}>
              <Grid item size={3.1}>
                <PnL label="Unrealised P&L" value={isPositionActive ? position.pnl : 0} />
              </Grid>

              <Grid item size={3}>
                <PnL label="Realised P&L" value={isPositionClosed ? position.pnl : 0} />
              </Grid>

              <Grid item size={3}>
                <PnL label="Target" value={position.target} />
              </Grid>

              <Grid item size={2.9}>
                <PnL label="Stoploss" value={position.stoploss} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ textAlign: "left" }}>
        {
          (position.Orders || position.orders)?.map((order, index) => <Order key={index} order={order} />)
        }
      </AccordionDetails>
    </Accordion>
  );
}

export default Position;
