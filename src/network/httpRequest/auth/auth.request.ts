import { httpClient } from "../../httpClient/httpClient";
import type {
  SigninModelBody,
  SigninModelResponse,
  SignupModelBody
} from "../../spec/auth/model";
import { API_SPEC } from "../../spec";

export class AuthRequestStatic {
  public static async signIn(
    email: string,
    password: string
  ): Promise<SigninModelResponse> {
    const { url } = API_SPEC.auth.signin;
    return await httpClient.post<SigninModelBody, SigninModelResponse>(url, {
      email,
      password
    });
  }

  public static async signUp(email: string, password: string): Promise<void> {
    const { url } = API_SPEC.auth.signup;
    await httpClient.post<SignupModelBody>(url, {
      email,
      password
    });
  }
}
