import { Box } from "@mui/material";
import { Snackbar } from "@components";
import AppRoutes from "@routes";
import "./App.css";

function App() {
  return (
    <Box className="App">
      <Snackbar />
      <AppRoutes />
    </Box>
  );
}

export default App;
