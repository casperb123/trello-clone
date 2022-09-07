export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export interface RefreshTokenResponse {
  expires_in: string;
  token_type: string;
  refresh_token: string;
  id_token: string;
  user_id: string;
  project_id: string;
}

export interface UserInterface {
  email: string;
  id: string;
  _token: string;
  refreshToken: string;
  tokenExpirationDate: Date;
  rememberMe: boolean;
}
