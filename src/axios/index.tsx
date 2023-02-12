import axios, { Axios, AxiosError } from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem("token");
const instance = axios.create({ baseURL });

const setToken = (config: any) => {
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
};

if (token) {
  instance.interceptors.request.use(setToken);
}

instance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error: any) => {
    // const { response, config } = error;
    // const originalRequest = config;
    const { response } = error;
    if (response.status === 400) {
      return response;
    }
    return Promise.reject(error);
  }
);

export default instance;
