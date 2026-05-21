import React from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import moment from "moment";

const CELL_SIZE = 18;

const MAX_ABS_PNL = 8000;

const getColor = (pnl) => {
  // Normalize pnl to 0 → 1
  const normalized = Math.min(Math.abs(pnl) / MAX_ABS_PNL, 1);

  // RED RANGE
  if (pnl < 0) {
    const intensity = Math.abs(normalized);
    const channel = 50 + normalized * 205;

    return `rgb(${channel}, 0, 0)`;
  }

  // GREEN RANGE
  const intensity = normalized;
  const channel = 50 + normalized * 205;

  return `rgb(0, ${channel}, 0)`;
};

const getCellStyle = (pnl, isWeekend, isCurrentMonth, theme) => {
  if (!isCurrentMonth) {
    return { opacity: 1 };
  }

  if (isWeekend) {
    return {
      backgroundColor:
        theme.palette.action.disabledBackground,
      opacity: 0.5,
    };
  }

  if (!pnl) {
    return {
      backgroundColor:
        theme.palette.action.hover,
      opacity: 1,
    };
  }

  return {
    backgroundColor: getColor(pnl),
    opacity: 1,
  };
};

const buildMonthData = (month, pnlMap) => {
  const start = moment(month)
    .startOf("month")
    .startOf("week");

  const end = moment(month)
    .endOf("month")
    .endOf("week");

  const current = start.clone();

  const days = [];

  while (current.isSameOrBefore(end)) {
    const dateKey = current.format("YYYY-MM-DD");

    const isWeekend =
      current.day() === 0 || current.day() === 6;

    days.push({
      date: dateKey,
      pnl: pnlMap.get(dateKey) || 0,
      isWeekend,
      isCurrentMonth:
        current.month() === moment(month).month(),
    });

    current.add(1, "day");
  }

  return days;
};

const PnlHeatMap = (props) => {
  const { data = [], onBlockClick: emitBlockClick } = props;
  const pnlMap = new Map();

  data.forEach((d) => {
    pnlMap.set(
      moment(d.date).format("YYYY-MM-DD"),
      Number(d.pnl)
    );
  });

  const months = Array.from({ length: 12 }, (_, i) =>
    moment().month(i)
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
      }}
    >
      {months.map((month) => {
        const days = buildMonthData(month, pnlMap);

        return (
          <Box key={month.format("MMM")} sx={{ p: 0.3 }}>
            {/* Month Header */}
            <Typography
              variant="subtitle2"
              sx={{
                mb: 1,
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {month.format("MMMM YYYY")}
            </Typography>

            {/* Calendar Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(7, 1fr)",
                gap: "4px",
              }}
            >
              {days.map((day) => (
                <Tooltip
                  key={day.date}
                  title={
                    <Box>
                      <Typography variant="caption">
                        {moment(day.date).format(
                          "ddd MMM DD, YYYY"
                        )}
                      </Typography>

                      <Typography
                        variant="caption"
                        display="block"
                        color={day.pnl >= 0 ? "success" : "error"}
                      >
                        P&L: ₹{day.pnl.toFixed(2)}
                      </Typography>
                    </Box>
                  }
                >
                  <Box
                    sx={(theme) => ({
                      width: CELL_SIZE,
                      height: CELL_SIZE,
                      borderRadius: "3px",

                      ...getCellStyle(
                        day.pnl,
                        day.isWeekend,
                        day.isCurrentMonth,
                        theme
                      ),

                      border:
                        day.pnl !== 0 &&
                          !day.isWeekend
                          ? "1px solid rgba(0,0,0,0.08)"
                          : "1px solid transparent",

                      cursor: "pointer",
                      transition: "transform 0.15s ease",
                      "&:hover": {
                        transform: "scale(1.25)",
                      },
                    })}
                    onClick={() => day.pnl && emitBlockClick && emitBlockClick(day.date)}
                  />
                </Tooltip>
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default PnlHeatMap;
