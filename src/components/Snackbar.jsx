import { useSelector, useDispatch } from "react-redux";
import { Snackbar as MuiSnackBar } from "@mui/material";
import { closeSnackbar } from "@redux";

function Snackbar() {
  const dispatch = useDispatch();
  const { open, message } = useSelector((state) => state.snackbar);

  const handleClose = (event, reason) => {
    dispatch(closeSnackbar());
  };

  return (
    <MuiSnackBar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    />
  );
}

export default Snackbar;
