export interface SigninModelBodyT {
  email: string;
  password: string;
}

export interface SigninModelResponseT {
  readonly access_token: string;
}
