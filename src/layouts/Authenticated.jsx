import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthentionStatus, setUser } from "../redux/userSlice";
import { socketService } from "../services/socketService";
import Header from "./Header";
import { userProfile } from "../api/services/authService";

function Authenticated() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.isAuthenticated) {
      return;
    }

    userProfile()
      .then(({ data: userDetails }) => {
        dispatch(
          setUser({
            ...userDetails,
            isAuthenticated: true,
          })
        );

        socketService.connect();
      })
      .catch((error) => {
        console.error(error);
        socketService.disconnect();

        navigate("/login");
        dispatch(setAuthentionStatus(false));
      });

    return () => {
      socketService.disconnect();
    };
  }, [user]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Authenticated;
