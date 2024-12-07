import axios from "axios";
import { store } from "@redux";
import { setAuthentionStatus } from "../redux/userSlice";

export const setAuthInterceptors = () => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const profileUrl = error.response.config.url.match(/.*users\/profile/);

      if (error.response.status === 401 && !profileUrl) {
        store.dispatch(setAuthentionStatus(false));
      }

      return Promise.reject(error);
    }
  );
};
