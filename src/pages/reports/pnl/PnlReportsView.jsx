import { useState, useEffect, useRef } from "react";
import moment from "moment";
import { Grid2 as Grid, Box, Typography, Stack, Chip } from "@mui/material";
import { getDayWisePnl } from "@api";
import { TabView, PnL, Position } from "@components";
import PnlHeatMap from "./components/PnlHeatMap";
import Metrics from "./components/Metrics";
import ReportFilters from "./components/ReportFilters";
import { selectKeys, titleize } from "@utils"

function PnlReportsView() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayWisePnl, setDayWisePnl] = useState([]);

  const reportFilterRef = useRef(null);

  const handleFilter = async (filter) => {
    reportFilterRef.current.setLoading(true);
    const pnls = await getDayWisePnl(filter.strategyId, selectKeys(filter, "fromDate", "toDate")) || [];
    setDayWisePnl(pnls);
    setSelectedDay(null);
    reportFilterRef.current.setLoading(false);
  };

  const handleDayBlockClick = (date) => {
    const day = dayWisePnl.find((_) => _.date === date);
    setSelectedDay(day);
  };

  const tabHeading = (day) => {
    const positions = (day?.positions || []);
    const formattedDate = moment(day.date).format("ddd MMM DD, YYYY");

    let taxes = 0;
    let brokerage = 0;
    positions.forEach((pos) => {
      if (!pos?.orders) return;

      pos.orders.forEach((order) => {
        taxes += order?.taxes || 0;
        brokerage += order?.brokerage || 0;
      });
    });

    return (
      <>
        <Stack direction="row" spacing={0.55} alignItems="left">
          <Typography variant="span">
            {titleize(day?.strategyName)}
          </Typography>
          <Chip label={positions.length} variant={"outlined"} color="info" size="small" />
        </Stack>
        <Typography variant="span" color="warning">
          {formattedDate}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <PnL
            label={"PnL"}
            value={positions.reduce((sum, { pnl }) => sum + pnl, 0)}
          />
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <PnL
            label={"Taxes"}
            value={-taxes}
            variant={"caption"}
          />
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <PnL
            label={"Brokerage"}
            value={-brokerage}
            variant={"caption"}
          />
        </Stack>
      </>
    );
  };

  return (
    <Box sx={{ flexGrow: 1, width: "100vw" }}>
      <Grid container spacing={4}>
        <Grid item size={{ md: 12, xs: 12 }}>
          <ReportFilters onSubmit={handleFilter} ref={reportFilterRef} />
        </Grid>
        <Grid item size={{ md: 6, xs: 12 }}>
          <PnlHeatMap
            data={dayWisePnl.map((data) => selectKeys(data, "date", "pnl"))}
            selectedDate={selectedDay?.date}
            onBlockClick={handleDayBlockClick}
          />
          <Grid container spacing={2}>
            <Grid item size={12}>
              {
                selectedDay && (
                  <TabView tabs={[{
                    heading: tabHeading(selectedDay),
                    panel: (
                      <Box>
                        {
                          (selectedDay.positions || [])
                            .sort((a, b) => new Date(b.entryTime) - new Date(a.entryTime))
                            .map((position, index) => (
                              <Position key={index} strategyId={position.strategyId} position={position} />
                            ))
                        }
                      </Box>
                    )
                  }]} />
                )
              }
            </Grid>
          </Grid>
        </Grid>

        <Grid item size={{ md: 6, xs: 12 }}>
          <Grid container spacing={2}>
            <Grid item size={12}>
              <Metrics dayWisePnl={dayWisePnl} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PnlReportsView;
