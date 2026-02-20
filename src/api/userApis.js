import apiClient from "./apiClient";

export const userProfileApi = () =>
  apiClient.get("/users/profile");

export const logoutApi = () => apiClient.post("/auth/logout");
