import apiClient from "./apiClient";

export const getStrategies = async (params) => {
  const response = await apiClient.get(`/strategies`, params);

  return response?.data || [];
}

export const getStrategy = async (id, params) => {
  const response = await apiClient.get(`/strategies/${id}`, params);

  return response?.data || [];
}

export const getDayWisePnl = async (id, params) => {
  const response = await apiClient.get(`/strategies/${id}/pnl-day-wise`, params);

  return response?.data || [];
}
