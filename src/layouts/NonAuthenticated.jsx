import { Paper, Grid2 as Grid } from "@mui/material";
import { useNavigate, Outlet } from "react-router-dom";

function NonAuthenticated() {
  const navigation = useNavigate();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Paper elevation={4} sx={{ width: 400 }}>
        <Outlet />
      </Paper>
    </Grid>
  );
}

export default NonAuthenticated;
