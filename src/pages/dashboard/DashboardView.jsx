import { Grid2 as Grid, Box } from "@mui/material";
import Nifty50Card from "./components/Nifty50Card";
import Nifty50FutCard from "./components/Nifty50FutCard";
import NiftyOptionChain from "./components/NiftyOptionChain";
import BracketOrders from "./components/BracketOrders";
import Actions from "./components/Actions";

function DashboardView() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item size={12}></Grid>
        <Grid item size={3}>
          <Nifty50Card />
        </Grid>
        <Grid item size={3}>
          <Nifty50FutCard />
        </Grid>
        <Grid item size={6}>
          <BracketOrders />
        </Grid>

        <Grid item size={6}>
          <NiftyOptionChain />
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardView;
