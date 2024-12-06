import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { Login, Otp, Dashboard } from "./pages";
import "./App.css";
import NonAuthenticated from "./layouts/NonAuthenticated";
import Authenticated from "./layouts/Authenticated";
import { Snackbar } from "./components";

function App() {
  return (
    <Box className="App">
      <Snackbar />
      <Routes>
        <Route element={<NonAuthenticated />}>
          <Route path="/login" element={<Login />} />
          <Route path="/validate-otp" element={<Otp />} />
        </Route>
        <Route element={<Authenticated />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
