import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  resendOtpApi,
  validateOtpApi,
  validateOtpSessionApi,
} from "@api";
import { openSnackbar } from "@redux";
import OtpView from "./OtpView";

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
    validateOtpSessionApi().catch((error) => {
      dispatch(openSnackbar(error.message));
      navigate("/login");
    });
  }, []);

  return <OtpView onResend={handleResend} onSubmit={handleSubmit} />;
}

export default OtpController;
