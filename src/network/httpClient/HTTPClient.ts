import type {
  AxiosInstance,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig
} from "axios";
import axios, { CreateAxiosDefaults } from "axios";
import { EHTTPStatusCode } from "./enum/EHTTPStatusCode";

export class HTTPClient {
  public static default = {
    headers: {
      "Content-Type": "application/json"
    } as AxiosRequestHeaders
  };
  private readonly _instance!: AxiosInstance;

  public constructor(configs: CreateAxiosDefaults) {
    const newInstance = axios.create({
      baseURL: configs.baseURL,
      headers: configs.headers || HTTPClient.default.headers,
      withCredentials: true
    });
    this._instance = newInstance;

    newInstance.interceptors.request.use(this.injectToken, Promise.reject);
    newInstance.interceptors.response.use(
      (response) => response,
      this.matchHTTPStatusErrors
    );
  }

  public get axios(): AxiosInstance {
    return this._instance;
  }

  private injectToken(cfg: InternalAxiosRequestConfig) {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        cfg.headers.Authorization = `Bearer ${accessToken}`;
      }

      return cfg as InternalAxiosRequestConfig;
    } catch (err) {
      throw err;
    }
  }

  private matchHTTPStatusErrors(err: any) {
    const { status } = err;

    // log common errors
    console.error(EHTTPStatusCode[status as EHTTPStatusCode]);

    switch (status as EHTTPStatusCode) {
      case EHTTPStatusCode.BAD_REQUEST:
        break;

      case EHTTPStatusCode.UNAUTHORIZED:
        break;

      case EHTTPStatusCode.FORBIDDEN:
        break;

      case EHTTPStatusCode.NOT_FOUND:
        break;

      case EHTTPStatusCode.INTERNAL_SERVER_ERROR:
        break;

      default:
        return Promise.reject(err);
    }
  }
}
