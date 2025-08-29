import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { setAuthentionStatus } from "@redux/userSlice";
import { logoutApi } from "@api";

function LogoutButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    logoutApi()
      .then(() => {
        dispatch(setAuthentionStatus(false));
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Button color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
