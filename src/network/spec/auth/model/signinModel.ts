export interface SigninModelBody {
  email: string;
  password: string;
}

export interface SigninModelResponse {
  readonly access_token: string;
}
