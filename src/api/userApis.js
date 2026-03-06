import apiClient from "./apiClient";

export const userProfileApi = () =>
  apiClient.get("/users/profile");

const { REACT_APP_BACKEND_HOST_URL } = process.env;
export const logoutApi = () => apiClient.post("/auth/logout", {}, { baseUrl: REACT_APP_BACKEND_HOST_URL });
