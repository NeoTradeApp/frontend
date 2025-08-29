import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ThemeLayout from "./ThemeLayout";

import { setAuthentionStatus, setUser } from "@redux";
import { socketService } from "@services";
import { userProfileApi } from "@api";

function Authenticated() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      return;
    }

    userProfileApi()
      .then(({ data: userDetails }) => {
        dispatch(setAuthentionStatus(true));
        dispatch(setUser(userDetails));

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
  }, [isAuthenticated]);

  return (
    <>
      <ThemeLayout />
    </>
  );
}

export default Authenticated;
