import { useState, useEffect } from "react";
import { Grid2 as Grid, Box } from "@mui/material";
import { getDayWisePnl } from "@api";
import { TabView } from "@components";
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
  };

  const handleDayBlockClick = (date) => {
    const day = dayWisePnl.find((_) => _.date === date);
    setSelectedDay(day);
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
                    heading: `${titleize(selectedDay.strategyName)} (${(selectedDay?.positions || []).length})`,
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
