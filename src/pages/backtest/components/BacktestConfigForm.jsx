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

import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';


const drawerWidth = 300;

const CONFIG_PARAMS = [
  {
    label: "Index FUT / Stock",
    name: "file",
    type: "dropdown",
    defaultValue: "NIFTY_50_2019_2025.csv",
    options: [
      { label: "Nifty 50 (2019 - 2025)", value: "NIFTY_50_2019_2025.csv" },
      { label: "Nifty 50 (2025)", value: "NIFTY_50_2025.csv" },
      { label: "Nifty 50 (2024)", value: "NIFTY_50_2024.csv" },
      { label: "Nifty 50 (2023)", value: "NIFTY_50_2023.csv" },
      { label: "Nifty 50 (2022)", value: "NIFTY_50_2022.csv" },
      { label: "Nifty 50 (2021)", value: "NIFTY_50_2021.csv" },
      { label: "Nifty 50 (2020)", value: "NIFTY_50_2020.csv" },
      { label: "Nifty 50 (2019)", value: "NIFTY_50_2019.csv" },
      { label: "Nifty 50 (2018)", value: "NIFTY_50_2018.csv" },
      { label: "Nifty 50 (2017)", value: "NIFTY_50_2017.csv" },
      { label: "Nifty 50 (2016)", value: "NIFTY_50_2016.csv" },
      { label: "Nifty 50 (2015)", value: "NIFTY_50_2015.csv" },
    ],
  },
  {
    label: "Lot Size",
    name: "lot-size",
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
    defaultValue: 100,
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
    name: "trailing-stoploss",
    type: "number",
    defaultValue: 75,
  },
  {
    label: "Trailing Stoploss At",
    name: "trail-stoploss-at",
    type: "number",
    defaultValue: 25,
  },
  {
    label: "Virtual Target",
    name: "virtual-target",
    type: "number",
    defaultValue: 100,
  },
  {
    label: "Day Target",
    name: "day-target",
    type: "number",
    defaultValue: 0,
  },
  {
    label: "Day Stoploss",
    name: "day-stoploss",
    type: "number",
    defaultValue: 0,
  },
  {
    label: "Number of Trades Limit (Per Day)",
    name: "day-trades-limit",
    type: "number",
    defaultValue: 0,
  },
  {
    label: "Start Time (Minutes)",
    name: "start-time",
    type: "number",
    defaultValue: 30,
  },
  {
    label: "Trade Interval (Minutes)",
    name: "trade-interval",
    type: "number",
    defaultValue: 30,
  },
  {
    label: "Simple Moving Average Period",
    name: "sma-period",
    type: "number",
    defaultValue: 100,
  },
  {
    label: "Exponentail Simple Moving Average Period",
    name: "ema-period",
    type: "number",
    defaultValue: 10,
  },
  {
    label: "Trade Decision",
    name: "trade-decision",
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
    label: "Mean Reversion",
    name: "mean-reversion",
    type: "boolean",
    defaultValue: false,
  },
  {
    label: "Mean Reversion Threshold",
    name: "mean-reversion-threshold",
    type: "number",
    defaultValue: 100,
  },
  {
    label: "Trend Follower",
    name: "trend-follower",
    type: "boolean",
    defaultValue: false,
  },
  {
    label: "Trends Tandle Count",
    name: "trends-candle-count",
    type: "number",
    defaultValue: 10,
  },
  {
    label: "Wait For Pullback",
    name: "wait-for-pullback",
    type: "boolean",
    defaultValue: false,
  },
  {
    label: "Mock first trade to get market direction",
    name: "first-mock-trade",
    type: "boolean",
    defaultValue: false,
  },
  {
    label: "Time Variance",
    name: "time-variance",
    type: "number",
    defaultValue: 0,
  },
  {
    label: "Download all trade logs for debugging",
    name: "debug-trades",
    type: "boolean",
    defaultValue: true,
  },
];

const CONFIG_PARAMS_DEFAULTS = CONFIG_PARAMS.reduce((obj, param) => {
  obj[param.name] = param.defaultValue;
  return obj;
}, {})

export default function BacktestConfigForm(props) {
  const { onSubmit: emitSubmit, onClear: emitClear } = props;

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
          onChange={(event) => handleConfigParamChange({ [name]: parseInt(event.target.value) || "" })}
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
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="right"
    >
      <Toolbar />
      <Divider />
      <List>
        {CONFIG_PARAMS.map((param, index) => (
          <ListItem key={index}>
            <FormControl fullWidth>
              {getComponent(param)}
            </FormControl>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem>
          <FormControl fullWidth>
            <Button variant="contained" onClick={handleSubmitButtonClick}>Backtest</Button>
          </FormControl>
        </ListItem>
        <ListItem>
          <FormControl fullWidth>
            <Button variant="outlined" onClick={() => emitClear()}>Clear Results</Button>
          </FormControl>
        </ListItem>
      </List>
    </Drawer>
  );
}
