import { EHTTPStatusCode } from "./enum/EHTTPStatusCode";
import type { InternalAxiosRequestConfig } from "axios";

class Middleware {
  public matchHTTPStatusErrors(err: any) {
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

  public injectToken(
    accessToken: string | null,
    cfg: InternalAxiosRequestConfig
  ) {
    try {
      if (accessToken) {
        cfg.headers.Authorization = `Bearer ${accessToken}`;
      }

      return cfg as InternalAxiosRequestConfig;
    } catch (err) {
      throw err;
    }
  }
}

export const axiosMiddleware = new Middleware();
