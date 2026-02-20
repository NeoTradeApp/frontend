import { CardHeader, Box, Typography } from "@mui/material";
import { useNavigate, Outlet } from "react-router-dom";

function KotakNeoTheme() {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", margin: "10px", padding: "10px" }}>
        <Box sx={{ width: "25px", height: "25px", margin: "5px" }}>
          <img src={"/images/kotakneo-logo.png"} style={{ width: "100%", height: "100%" }} />
        </Box>
        <Typography sx={{ padding: "5px" }}> Kotak Securities </Typography>
      </Box>
      <Outlet />
    </Box >
  );
}

export default KotakNeoTheme;
