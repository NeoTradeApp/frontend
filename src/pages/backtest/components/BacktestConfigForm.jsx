import { useRef } from 'react';
import {
  Box,
  FormControl,
  TextField,
  Grid2 as Grid,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';
import DropDown from './DropDown';

const CONFIG_PARAMS = [
  {
    label: "Index FUT / Stock",
    name: "index",
    type: "dropdown",
    defaultValue: "NIFTY_50",
    options: [
      { label: "Nifty 50", value: "NIFTY_50" },
      { label: "Bank Nifty", value: "BANK_NIFTY" },
    ],
  },
  {
    label: "Lot Size",
    name: "lotSize",
    type: "number",
    defaultValue: 75,
  },
  {
    label: "No. of lots",
    name: "lots",
    type: "dropdown",
    defaultValue: 1,
    options: [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
      { label: "5", value: 5 },
      { label: "6", value: 6 },
      { label: "7", value: 7 },
      { label: "8", value: 8 },
      { label: "9", value: 9 },
      { label: "10", value: 10 },
    ],
  },
  {
    label: "Tax and Brokerage",
    name: "deductions",
    type: "number",
    defaultValue: 80,
  },
  {
    label: "Target",
    name: "target",
    type: "number",
    defaultValue: 200,
  },
  {
    label: "Stoploss",
    name: "stoploss",
    type: "number",
    defaultValue: -50,
  },
  {
    label: "Trailing Stoploss",
    name: "trailing_stoploss",
    type: "number",
    defaultValue: 75,
  },
  {
    label: "Trailing Stoploss At",
    name: "trail_stoploss_at",
    type: "number",
    defaultValue: 25,
  },
  {
    label: "Day Stoploss",
    name: "day_stoploss",
    type: "number",
    defaultValue: 0,
  },
  {
    label: "Start Time (Minutes)",
    name: "start_time",
    type: "number",
    defaultValue: 30,
  },
  {
    label: "Trade Interval (Minutes)",
    name: "trade_interval",
    type: "number",
    defaultValue: 30,
  },
  {
    label: "Simple Moving Average Period",
    name: "sma_period",
    type: "number",
    defaultValue: 100,
  },
  {
    label: "Exponentail Simple Moving Average Period",
    name: "ema_period",
    type: "number",
    defaultValue: 10,
  },
  {
    label: "Trade Decision",
    name: "trade_decision",
    type: "dropdown",
    defaultValue: "ema",
    options: [
      { label: "All trades based on EMA", value: "ema" },
      { label: "EMA First then based on previous trade", value: "emap" },
      { label: "All trades based on SMA", value: "sma" },
      { label: "SMA First then based on previous trade", value: "smap" },
      { label: "Random first then based on previous trade", value: "p" },
      { label: "Random", value: "random" },
    ],
  },
  {
    label: "Mock first trade to get market direction",
    name: "first_mock_trade",
    type: "boolean",
    defaultValue: false,
  },
  {
    label: "Download all trade logs for debugging",
    name: "debug_trades",
    type: "boolean",
    defaultValue: true,
  },
];

const CONFIG_PARAMS_DEFAULTS = CONFIG_PARAMS.reduce((obj, param) => {
  obj[param.name] = param.defaultValue;
  return obj;
}, {})

export default function BacktestConfigForm(props) {
  const { onSubmit: emitSubmit } = props;

  const configParams = useRef(CONFIG_PARAMS_DEFAULTS);

  const handleConfigParamChange = (param) => {
    configParams.current = { ...configParams.current, ...param };
  };

  const handleSubmitButtonClick = () => {
    emitSubmit && emitSubmit(configParams.current);
  };

  const getComponent = (param) => {
    const { type, label, defaultValue, name, options = [] } = param;
    switch (type) {
      case "dropdown":
        return <DropDown
          id={name}
          label={label}
          options={options}
          defaultValue={defaultValue}
          onChange={(newValue) => handleConfigParamChange({ [name]: newValue })}
        />;

      case "text":
        return <TextField
          id={name}
          type="text"
          label={label}
          defaultValue={defaultValue}
          onChange={(event) => handleConfigParamChange({ [name]: event.target.value })}
        />;

      case "number":
        return <TextField
          id={name}
          type="number"
          label={label}
          defaultValue={defaultValue}
          onChange={(event) => handleConfigParamChange({ [name]: event.target.value })}
        />;

      case "boolean":
        return <FormControlLabel
          control={<Checkbox />}
          label={label}
          defaultChecked={defaultValue}
          labelPlacement="end"
          onChange={(event) => handleConfigParamChange({ [name]: event.target.checked })}
        />
    }
  };

  return (
    <Box sx={{ flexGrow: 1, boxShadow: "1px solid" }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {CONFIG_PARAMS.map((param, index) => (
          <Grid key={index} size={{ xs: 3, sm: 3, md: 3 }}>
            <FormControl fullWidth>
              {getComponent(param)}
            </FormControl>
          </Grid>
        ))}
        <Button variant="contained" onClick={handleSubmitButtonClick}>Backtest</Button>
        <Button variant="outlined">Reset to Default</Button>
      </Grid>
    </Box>
  );
}
