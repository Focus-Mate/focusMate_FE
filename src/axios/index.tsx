import axios from "axios";

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

instance.interceptors.response.use((response) => {
  return response;
});

export default instance;
