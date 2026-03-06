import apiClient from "../apiClient";

export const loginApi = (mobileNumber, ucc, totp) =>
  apiClient.post("/kotakneo/auth/login", { mobileNumber, ucc, totp });

export const validateMpinApi = (mpin) =>
  apiClient.post("/kotakneo/auth/validate-mpin", { mpin });

export const validateMpinSessionApi = () =>
  apiClient.post("/kotakneo/auth/validate-mpin-session");
