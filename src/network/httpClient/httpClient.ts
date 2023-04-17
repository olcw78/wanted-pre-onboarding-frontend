import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios, { CreateAxiosDefaults } from "axios";
import { axiosMiddleware } from "./middleware";

class HttpClient {
  //#region fields

  public static defaultCfg: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    timeout: 10000
  };

  private readonly _instance!: AxiosInstance;

  //#endregion fields

  public constructor(configs: CreateAxiosDefaults) {
    const newInstance = axios.create({
      baseURL: configs.baseURL,
      headers: configs.headers || HttpClient.defaultCfg.headers
    });
    this._instance = newInstance;

    newInstance.interceptors.request.use(
      (value) => axiosMiddleware.injectToken(this.accessToken, value),
      Promise.reject
    );
    newInstance.interceptors.response.use(
      (response) => response,
      axiosMiddleware.matchHTTPStatusErrors
    );
  }

  //#region accessors

  public get axios(): AxiosInstance {
    return this._instance;
  }

  public get accessToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  //#endregion accessors

  //#region HTTP methods

  public async get<BodyT extends Object = {}, ResponseT extends Object = {}>(
    url: string,
    requestConfig?: AxiosRequestConfig<BodyT>
  ): Promise<ResponseT> {
    const request = await this.axios.get(url, requestConfig).catch((err) => {
      throw err;
    });
    return request.data as ResponseT;
  }

  public async post<BodyT extends Object = {}, ResponseT extends Object = {}>(
    url: string,
    data: BodyT,
    requestConfig?: AxiosRequestConfig<BodyT>
  ): Promise<ResponseT> {
    const request = await this.axios
      .post(url, data, requestConfig)
      .catch((err) => {
        throw err;
      });
    return request.data as ResponseT;
  }

  public async put<BodyT extends Object = {}, ResponseT extends Object = {}>(
    url: string,
    data: BodyT,
    requestConfig?: AxiosRequestConfig<BodyT>
  ): Promise<ResponseT> {
    const request = await this.axios
      .put(url, data, requestConfig)
      .catch((err) => {
        throw err;
      });
    return request.data as ResponseT;
  }

  public async delete<BodyT extends Object = {}, ResponseT extends Object = {}>(
    url: string,
    requestConfig?: AxiosRequestConfig<BodyT>
  ): Promise<ResponseT> {
    const request = await this.axios.delete(url, requestConfig).catch((err) => {
      throw err;
    });
    return request.data as ResponseT;
  }

  //#endregion HTTP methods
}

export const httpClient = new HttpClient({
  baseURL: "https://www.pre-onboarding-selection-task.shop/"
});
