import { Grid2 as Grid, Card, CardContent, Typography } from "@mui/material";
import { Nifty50 } from "@components";

function DashboardController() {
  return (
    <Grid
      container
      spacing={2}
      position={"left"}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Nifty 50
          </Typography>
          <Nifty50 />
        </CardContent>
      </Card>
    </Grid>
  );
}

export default DashboardController;
