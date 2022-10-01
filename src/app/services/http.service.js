import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

axios.defaults.baseURL = configFile.apiEndpoint;

axios.interceptors.request.use(
  (config) => {
    if (configFile.isFireBase) {
      const slashEnd = /\/$/.test(config.url);
      if (slashEnd) {
        config.url = config.url.slice(0, -1);
      }
      config.url += ".json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const transformData = (data) => (data ? Object.values(data) : []);

axios.interceptors.response.use(
  (res) => {
    if (configFile.isFireBase) {
      res.data = { content: transformData(res.data) };
    }

    return res;
  },
  (error) => {
    const expectedErrors =
      error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedErrors) {
      console.log(error);
      toast.error("Somthing was wrong. Try it later");
    }
    return Promise.reject(error);
  },
);

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default httpService;
