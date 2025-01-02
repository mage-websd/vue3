export interface IRefreshTokenRequest {
  refreshToken: string;
}

export interface IRefreshTokenResponse {
  refreshToken: string;
  accessToken: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
}
