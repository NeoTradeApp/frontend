import { useState, useEffect } from "react";
import moment from "moment";
import {
  Box,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Button,
  Select,
} from "@mui/material";

import {
  LocalizationProvider,
  DatePicker,
} from "@mui/x-date-pickers";
import { getStrategies } from "@api";
import { titleize } from "@utils";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const ReportFilters = (props) => {
  const { onSubmit: emitSubmit } = props;

  const [strategyOptions, setStrategyOptions] = useState([]);
  const [filter, setFilter] = useState({
    strategy: "",
    fromDate: moment().startOf("month"),
    toDate: moment(),
  });

  const mandatoryFieldsPresent = [
    "strategyId", "fromDate", "toDate",
  ].every((key) => !!filter[key]);

  const updateFilter = (update) => {
    setFilter({ ...filter, ...update });
  };

  useEffect(() => {
    getStrategies().then((strategies) => {
      if (!strategies) return;

      setStrategyOptions(strategies);
    })
  }, [getStrategies]);

  const fromDateError =
    filter.fromDate?.isAfter(filter.toDate);

  const toDateError =
    filter.toDate?.isBefore(filter.fromDate);

  const formattedDate = (date) => date.format("YYYY-MM-DD");
  const handleSubmitClick = () => {
    const { strategyId, fromDate, toDate } = filter;

    emitSubmit && emitSubmit({
      strategyId,
      fromDate: formattedDate(fromDate),
      toDate: formattedDate(toDate),
    });
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 2,

          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignItems: "center",

          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            minWidth: 80,
          }}
        >
          Filters
        </Typography>

        {/* Strategy Select */}
        <Select
          value={filter.strategyId}
          label="Strategy"
          onChange={(e) =>
            updateFilter({ strategyId: e.target.value })
          }
          sx={{
            minWidth: 220,
          }}
        >
          {strategyOptions.map((strategy) => (
            <MenuItem
              key={strategy.id}
              value={strategy.id}
            >
              {titleize(strategy.strategyName)}
            </MenuItem>
          ))}
        </Select>

        {/* From Date */}
        <DatePicker
          label="From"
          value={filter.fromDate}
          onChange={(newValue) =>
            updateFilter({ fromDate: newValue })
          }
          inputFormat="DD/MM/YYYY"
          maxDate={filter.toDate}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              error={fromDateError}
              helperText={
                fromDateError
                  ? "From date cannot exceed To date"
                  : ""
              }
              sx={{
                minWidth: 180,
              }}
            />
          )}
        />

        {/* To Date */}
        <DatePicker
          label="To"
          value={filter.toDate}
          onChange={(newValue) =>
            updateFilter({ toDate: newValue })
          }
          inputFormat="DD/MM/YYYY"
          minDate={filter.fromDate}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              error={toDateError}
              helperText={
                toDateError
                  ? "To date cannot be before From date"
                  : ""
              }
              sx={{
                minWidth: 180,
              }}
            />
          )}
        />

        <Button
          variant="contained"
          size="medium"
          sx={{
            minWidth: 100,
            height: 40,
            textTransform: "none",
            borderRadius: 2,
          }}
          onClick={() => handleSubmitClick()}
          disabled={!mandatoryFieldsPresent}
        >
          Go
        </Button>
      </Paper>
    </LocalizationProvider>
  );
};

export default ReportFilters;
