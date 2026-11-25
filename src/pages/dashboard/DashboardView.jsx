import { Grid2 as Grid, Box } from "@mui/material";
import Nifty50Card from "./components/Nifty50Card";
import Nifty50FutCard from "./components/Nifty50FutCard";
import NiftyOptionChain from "./components/NiftyOptionChain";
import PortfolioCard from "./components/PortfolioCard";
import { Strategies } from "@components";

function DashboardView() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item size={{ md: 6, xs: 12 }}>
          <Grid container spacing={2}>
            <Grid item size={{ md: 6, xs: 12 }}>
              <Nifty50Card />
            </Grid>
            <Grid item size={{ md: 6, xs: 12 }}>
              <Nifty50FutCard />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item size={{ md: 12, xs: 12 }}>
              <NiftyOptionChain />
            </Grid>
          </Grid>
        </Grid>

        <Grid item size={{ md: 6, xs: 12 }}>
          <Grid container spacing={2}>
            <Grid item size={12}>
              <PortfolioCard />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid size={12} sx={{ minWidth: 0, maxWidth: '100%' }}>
              <Strategies />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardView;
