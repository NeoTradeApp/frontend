import apiClient from "../apiClient";

export const loginApi = (mobileNumber, password) =>
  apiClient.post("/kotakneo/auth/login", { mobileNumber, password });

export const resendOtpApi = () => apiClient.post("/kotakneo/auth/resend-otp");

export const validateOtpApi = (otp) =>
  apiClient.post("/kotakneo/auth/validate-otp", { otp });

export const validateOtpSessionApi = () =>
  apiClient.post("/kotakneo/auth/validate-otp-session");
