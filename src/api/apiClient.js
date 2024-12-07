import axios from "axios";

const { REACT_APP_BACKEND_HOST_URL, REACT_APP_BACKEND_API_VERSION } =
  process.env;

const url = (path) =>
  `${REACT_APP_BACKEND_HOST_URL}/api/${REACT_APP_BACKEND_API_VERSION}${path}`;

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
