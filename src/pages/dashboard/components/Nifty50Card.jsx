import { Card, CardContent, Typography } from "@mui/material";
import { Nifty50 } from "@components";

function Nifty50Card() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Nifty 50
        </Typography>
        <Nifty50 />
      </CardContent>
    </Card>
  );
}

export default Nifty50Card;
