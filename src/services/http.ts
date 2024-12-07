import axios, { AxiosInstance } from "axios";

import { localStorageAuthToken } from "./localStorage";

import CONFIG from "../config";

import HTTP_STATUS_CODES from "../constants/httpCodes";
import ROUTES from "../constants/routes";
// import { showToast } from "../utils/toast";

class HTTPService {
  baseURL: string | undefined = undefined;

  authToken: string | undefined | null = localStorageAuthToken.get();

  axiosInstance: AxiosInstance | undefined = undefined;

  constructor() {
    this.setBaseURL(CONFIG.API.BASE_URL);
    this.createAxiosInstance();
  }

  getBaseURL(): string {
    return this.baseURL ?? "";
  }

  setBaseURL(newBaseUrl: string) {
    this.baseURL = newBaseUrl;
  }

  getAuthToken(): string {
    return this.authToken ?? "";
  }

  setAuthToken(newAuthToken: string): void {
    this.authToken = newAuthToken;
    localStorageAuthToken.set(newAuthToken);
  }

  clearAuthToken(): void {
    this.authToken = undefined;
    localStorageAuthToken.delete();
  }

  createAxiosInstance(): void {
    const instance = axios.create({
      baseURL: this.baseURL ?? "",
      headers: {
        "Content-Type": "application/json",
      },
    });

    instance.interceptors.request.use(
      (config) => {
        const updatedConfig = config;
        const savedAuthToken = this.getAuthToken();
        if (savedAuthToken) {
          updatedConfig.headers = {
            ...config.headers,
            "auth-token": savedAuthToken,
          };
        } else if (
          updatedConfig.headers &&
          Object.prototype.hasOwnProperty.call(
            updatedConfig.headers,
            "auth-token"
          )
        ) {
          delete updatedConfig.headers["auth-token"];
        }

        return updatedConfig;
      },
      (error) => error
    );

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === HTTP_STATUS_CODES.ERROR.UNAUTHORIZED) {
          this.clearAuthToken();
          // showToast(
          //   "error",
          //   error.response?.data?.message ?? "Something went wrong",
          //   "HTTP Error"
          // );
          window.open(
            `${CONFIG.CLIENT.BASE_URL}${ROUTES.ROOT}${ROUTES.AUTH.LOGIN}`,
            "_self"
          );
        }
        return Promise.reject(error);
      }
    );

    this.axiosInstance = instance;
  }

  // TODO: check if we can use this out of the box, if not use the utils
  // https://github.com/axios/axios#request-config
  get(urlPath: string, params: Record<string, any> | null = null) {
    if (params) {
      return this.axiosInstance?.get(urlPath, { params });
    }
    return this.axiosInstance?.get(urlPath);
  }

  post(
    urlPath: string,
    payload: Record<string, any> | null = null,
    params: Record<string, any> | null = null
  ) {
    if (params) {
      return this.axiosInstance?.post(urlPath, payload, { params });
    }
    return this.axiosInstance?.post(urlPath, payload);
  }

  patch(
    urlPath: string,
    payload: Record<string, any> | null = null,
    params: Record<string, any> | null = null
  ) {
    if (params) {
      return this.axiosInstance?.patch(urlPath, payload, { params });
    }
    return this.axiosInstance?.patch(urlPath, payload);
  }

  delete(urlPath: string, params: Record<string, any> | null = null) {
    if (params) {
      return this.axiosInstance?.delete(urlPath, { params });
    }
    return this.axiosInstance?.delete(urlPath);
  }
}

const http = new HTTPService();

export default http;
