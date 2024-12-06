import apiClient from "./apiClient";

export const loginApi = (mobileNumber, password) =>
  apiClient.post("/auth/login", { mobileNumber, password });

export const resendOtpApi = () => apiClient.post("/auth/resend-otp");

export const validateOtpApi = (otp) =>
  apiClient.post("/auth/validate-otp", { otp });

export const validateOtpSession = () =>
  apiClient.post("/auth/validate-otp-session");

export const userProfile = () =>
  apiClient.get("/users/profile");

export const logoutApi = () => apiClient.post("/auth/logout");
