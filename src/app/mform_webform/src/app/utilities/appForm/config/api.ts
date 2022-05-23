// import axios from "axios";
// import { BASE_URL } from "../services/form.service";
import { TRANSACTION_ID_KEY_IN_SESSION_STORAGE } from "../constants";

const getToken = () => localStorage.getItem("token");
let axios: any;
let BASE_URL: any;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": `application/json`,
    "x-access-token": getToken(),
  },
});

export const axiosInstanceWithoutDefaultConfig = axios.create({});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = getToken();
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

const getErrorBody = (error: any) => {
  const errorResponse = error?.response;
  return {
    username: JSON.parse(localStorage.getItem("user"))?.mobile,
    endPoint: errorResponse?.config?.baseURL + errorResponse?.config.url,
    errorMessage: error?.message,
    errorCode: errorResponse?.status,
    transactionId: sessionStorage.getItem(
      TRANSACTION_ID_KEY_IN_SESSION_STORAGE
    ),
  };
};

const axiosResponseInterceptorSuccessCallBack = (response: any) => {
  return response;
};

const axiosResponseInterceptorErrorCallBack = (error: any) => {
  if (error.response && getToken()) {
    axiosInstance.post("error_log", getErrorBody(error));
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(
  axiosResponseInterceptorSuccessCallBack,
  axiosResponseInterceptorErrorCallBack
);

axiosInstanceWithoutDefaultConfig.interceptors.response.use(
  axiosResponseInterceptorSuccessCallBack,
  axiosResponseInterceptorErrorCallBack
);

export default axiosInstance;
