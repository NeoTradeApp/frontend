import axios from "axios";
import { getErrorMessage } from "@utils"

const { REACT_APP_BACKEND_HOST_URL, REACT_APP_BACKEND_API_VERSION } =
  process.env;

const url = (path, baseUrl) =>
  baseUrl
    ? `${baseUrl}${path}`
    : `${REACT_APP_BACKEND_HOST_URL}/api/${REACT_APP_BACKEND_API_VERSION}${path}`;

const defaultOptions = { withCredentials: true };

const apiClient = {
  get: async (path, params = {}, options = {}) => {
    try {
      const response = await axios.get(url(path, options.baseUrl), {
        params,
        ...defaultOptions,
        ...options,
      });

      return response.data;
    } catch (error) {
      if (error.status !== 401) {
        throw new Error(getErrorMessage(error));
      }
    }
  },

  post: async (path, data = {}, options = {}) => {
    try {
      const response = await axios.post(url(path, options.baseUrl), data, {
        ...defaultOptions,
        ...options,
      });

      return response.data;
    } catch (error) {
      if (error.status !== 401) {
        throw new Error(getErrorMessage(error.response || error));
      }
    }
  },
};

export default apiClient;
