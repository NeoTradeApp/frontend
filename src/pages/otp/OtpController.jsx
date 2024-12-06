import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  resendOtpApi,
  validateOtpApi,
  validateOtpSession,
} from "../../api/services/authService";
import OtpView from "./OtpView";
import { open as openSnackbar } from "../../redux/snackbarSlice";

function OtpController() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (otp) =>
    new Promise((resolve, reject) => {
      validateOtpApi(otp)
        .then((data) => {
          resolve(data.message);
          navigate("/");
        })
        .catch((error) => reject(error.message));
    });

  const handleResend = () =>
    new Promise((resolve, reject) => {
      resendOtpApi()
        .then((data) => {
          resolve(data.message);
        })
        .catch((error) => reject(error.message));
    });

  useEffect(() => {
    validateOtpSession().catch((error) => {
      dispatch(openSnackbar(error.message));
      navigate("/login");
    });
  }, []);

  return <OtpView onResend={handleResend} onSubmit={handleSubmit} />;
}

export default OtpController;
