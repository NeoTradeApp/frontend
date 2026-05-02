import * as React from "react";
import {
  Box,
  Tabs,
  Tab,
} from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabView(props) {
  const { tabs = [] } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {tabs.map((tab, index) => {
            return (
              <Tab key={index} label={tab.heading} {...a11yProps(index)} />
            )
          })}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => {
        return (
          <CustomTabPanel key={index} value={value} index={index}>
            {tab.panel}
          </CustomTabPanel>
        )
      })}
    </Box>
  );
}
