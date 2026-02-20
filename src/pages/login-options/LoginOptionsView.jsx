import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  FormHelperText,
  Button,
} from "@mui/material";

function LoginOptionsView(props) {
  const navigate = useNavigate();

  return (
    <Card variant="blank" sx={{ m: 3, p: 2 }}>
      <CardHeader title="Login with" />

      <CardContent sx={{ height: "100px" }}>
        <Button
          variant="outlined"
          startIcon={
            <img src={"/images/kite-logo.png"} style={{ width: "50px" }} />
          }
        >
          <Box sx={{ width: "150px", textAlign: "left" }}>
            Kite
            <FormHelperText>Powered by Zerodha</FormHelperText>
          </Box>
        </Button>
      </CardContent>

      <CardContent sx={{ height: "100px" }}>
        <Button
          variant="outlined"
          startIcon={
            <img src={"/images/kotakneo-logo.png"} style={{ width: "50px" }} />
          }
          onClick={() => navigate("/kotakneo/login")}
        >
          <Box sx={{ width: "150px", textAlign: "left" }}>
            Kotak Neo
            <FormHelperText>Powered by Kotak Securities</FormHelperText>
          </Box>
        </Button>
      </CardContent>
    </Card>
  );
}

export default LoginOptionsView;
