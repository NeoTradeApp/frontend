import { Card, CardContent, Button, Paper, styled } from "@mui/material";

function Actions() {
  return (
    <Card sx={{ height: 1 }}>
      <CardContent>
        <Button variant="contained" color="success">
          Long
        </Button>

        <Button variant="contained" color="error">
          Short
        </Button>
      </CardContent>
    </Card>
  );
}

export default Actions;
