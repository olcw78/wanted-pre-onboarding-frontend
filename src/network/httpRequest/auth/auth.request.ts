import { httpClient } from "../../httpClient/httpClient";
import type {
  SigninModelBody,
  SigninModelResponse
} from "../../spec/auth/model";
import { SignupModelBody } from "../../spec/auth/model";
import { API_SPEC } from "../../spec";

export class AuthRequestStatic {
  private static get signInSpec() {
    return API_SPEC.auth.signin;
  }

  private static get signUpSpec() {
    return API_SPEC.auth.signup;
  }

  public static async signIn(
    email: string,
    password: string
  ): Promise<SigninModelResponse> {
    return await httpClient.post<SigninModelBody, SigninModelResponse>(
      this.signInSpec.url,
      { email, password }
    );
  }

  public static async signUp(email: string, password: string): Promise<void> {
    await httpClient.post<SignupModelBody>(this.signUpSpec.url, {
      email,
      password
    });
  }
}
