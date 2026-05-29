import { useState, useEffect } from "react";
import moment from "moment";
import { Grid2 as Grid, Box, Typography, Stack, Chip } from "@mui/material";
import { getDayWisePnl } from "@api";
import { TabView, PnL } from "@components";
import PnlHeatMap from "./components/PnlHeatMap";
import Metrics from "./components/Metrics";
import Position from "../../strategies/Position";
import ReportFilters from "./components/ReportFilters";
import { selectKeys, titleize } from "@utils"

function PnlReportsView() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayWisePnl, setDayWisePnl] = useState([]);

  const allPositions = dayWisePnl.reduce((allPositions, day) => {
    allPositions = [...allPositions, ...(day.positions || [])];

    return allPositions;
  }, []);

  const handleFilter = async (filter) => {
    const pnls = await getDayWisePnl(filter.strategyId, selectKeys(filter, "fromDate", "toDate")) || [];
    setDayWisePnl(pnls);
    setSelectedDay(null);
  };

  const handleDayBlockClick = (date) => {
    const day = dayWisePnl.find((_) => _.date === date);
    setSelectedDay(day);
  };

  const tabHeading = (day) => {
    const positions = (day?.positions || []);
    const formattedDate = moment(day.date).format("ddd MMM DD, YYYY");

    return (
      <PnL
        label={
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
          </>
        }
        value={positions.reduce((sum, { pnl }) => sum + pnl, 0)}
      />
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Grid item size={12}>
          <ReportFilters onSubmit={handleFilter} />
        </Grid>
        <Grid item size={6}>
          <PnlHeatMap
            data={dayWisePnl.map((data) => selectKeys(data, "date", "pnl"))}
            selectedDate={selectedDay?.date}
            onBlockClick={handleDayBlockClick}
          />
        </Grid>

        <Grid item size={6}>
          <Grid container spacing={2}>
            <Grid item size={12}>
              <Metrics positions={allPositions} />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item size={12}>
              {
                selectedDay && (
                  <TabView tabs={[{
                    heading: tabHeading(selectedDay),
                    panel: <>
                      {
                        (selectedDay.positions || [])
                          .sort((a, b) => new Date(b.entryTime) - new Date(a.entryTime))
                          .map((position, index) => (
                            <Position key={index} strategyId={position.strategyId} position={position} />
                          ))
                      }
                    </>
                  }]} />
                )
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PnlReportsView;
