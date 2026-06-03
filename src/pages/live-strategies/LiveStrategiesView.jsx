import { Grid2 as Grid, Box } from "@mui/material";
import PortfolioCard from "../dashboard/components/PortfolioCard";
import { Strategies } from "@components";

function DashboardView() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item size={12}>
          <PortfolioCard />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item size={12}>
          <Strategies />
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardView;
