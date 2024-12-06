import axios from "axios";

const { REACT_APP_BACKEND_HOST_URL } = process.env;

const API_VERSION = "v1";

const url = (path) => `${REACT_APP_BACKEND_HOST_URL}/api/${API_VERSION}${path}`;

const defaultOptions = { withCredentials: true };

const apiClient = {
  get: async (path, params = {}, options = {}) => {
    try {
      const response = await axios.get(url(path), {
        params,
        ...defaultOptions,
        ...options,
      });

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  post: async (path, data = {}, options = {}) => {
    try {
      const response = await axios.post(url(path), data, {
        ...defaultOptions,
        ...options,
      });

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default apiClient;
