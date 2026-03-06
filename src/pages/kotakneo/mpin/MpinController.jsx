import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { kotakNeoApis } from "@api";
import { openSnackbar } from "@redux";
import MpinView from "./MpinView";

function MpinController() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (mpin) =>
    new Promise((resolve, reject) => {
      kotakNeoApis.validateMpinApi(mpin)
        .then((data) => {
          resolve(data.message);
          navigate("/");
        })
        .catch((error) => reject(error.message));
    });

  useEffect(() => {
    kotakNeoApis.validateMpinSessionApi().catch((error) => {
      dispatch(openSnackbar(error.message));
      navigate("/login");
    });
  }, []);

  return <MpinView onSubmit={handleSubmit} />;
}

export default MpinController;
