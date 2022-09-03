export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export interface UserInterface {
  email: string;
  id: string;
  _token: string;
  _tokenExpirationDate: Date;
}
