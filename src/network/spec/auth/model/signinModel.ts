export interface SigninModelBody {
  email: string;
  password: string;
}

export interface SigninModelResponse {
  access_token: string;
}
