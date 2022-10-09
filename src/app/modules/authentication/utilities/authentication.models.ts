export class User {
  constructor(
    public id: string,
    public email: string,
    private _token: string,
    public refreshToken: string,
    public tokenExpirationDate: Date,
    public rememberMe: boolean,
    public emailVerified?: boolean,
    public displayName?: string,
    public photoUrl?: string,
    public passwordUpdatedAt?: number
  ) {}

  public get token(): string {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }

    return this._token;
  }
}

export class UserData {
  constructor(
    public displayName: string,
    public emailVerified?: boolean,
    public photoUrl?: string,
    public passwordUpdatedAt?: string
  ) {}
}
