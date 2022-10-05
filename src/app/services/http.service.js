import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

const http = axios.create({ baseURL: configFile.apiEndpoint });

http.interceptors.request.use(
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

http.interceptors.response.use(
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
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
};

export default httpService;
