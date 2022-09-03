export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    public refreshToken: string,
    public tokenExpirationDate: Date,
    public rememberMe: boolean
  ) {}

  public get token(): string {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }

    return this._token;
  }
}
