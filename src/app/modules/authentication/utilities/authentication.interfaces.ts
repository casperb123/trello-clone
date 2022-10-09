import { UserData } from './authentication.models';

export interface AuthLoginResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export interface AuthRegisterResponse extends AuthLoginResponse {
  userData: UserData;
}

export interface AuthUserDataResponse {
  users: [
    user: {
      localId: string;
      email: string;
      emailVerified: boolean;
      displayName: string;
      providerUserInfo: JSON[];
      photoUrl: string;
      passwordHash: string;
      passwordUpdatedAt: string;
      validSince: string;
      disabled: boolean;
      lastLoginAt: string;
      createdAt: string;
      customAuth: boolean;
    }
  ];
}

export interface AuthUpdateUserDataResponse {
  localId: string;
  email: string;
  displayName: string;
  photoUrl: string;
  passwordHash: string;
  providerUserInfo: JSON[];
  idToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface AuthRefreshTokenResponse {
  expires_in: string;
  token_type: string;
  refresh_token: string;
  id_token: string;
  user_id: string;
  project_id: string;
}

export interface AuthUser {
  email: string;
  id: string;
  _token: string;
  refreshToken: string;
  tokenExpirationDate: Date;
  rememberMe: boolean;
}
