import apiClient from "../apiClient";

export const getOptionsChain = (underlying, expiry) =>
  apiClient.get("/kotakneo/market-feed/options-chain", { underlying, expiry });
