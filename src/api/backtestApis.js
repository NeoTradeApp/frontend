import apiClient from "./apiClient";

export const backtest = (params) =>
  apiClient.post(`/backtest`, params);
