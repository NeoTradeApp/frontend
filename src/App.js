import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline } from "@mui/material";
import { Snackbar } from "@components";
import AppRoutes from "@routes";
import "./App.css";

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0052cc',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box className="App">
        <Snackbar />
        <AppRoutes />
      </Box>
    </ThemeProvider>
  );
}

export default App;
