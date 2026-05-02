import apiClient from "./apiClient";

export const getStrategies = (params) =>
  apiClient.get(`/strategies`, params);
