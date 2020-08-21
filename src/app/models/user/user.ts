export class User {
  public uid?: string;
  public user?: User;
  public email?: User;
  public apiKey?: string;
  public role?: string;
  public createdAt?: string;
  public lastLoginAt?: string;
  public emailVerified?: boolean;
  public refreshToken?: string;
  public password?: string;
  public token?: string;
  public name?: string;
  public displayName?: string;
  public photoURL?: string;
  public expires?: string;
  public stsTokenManager?: IToken;
}

export interface IToken {
  accessToken: string;
  apiKey: string;
  expirationTime: number;
  refreshToken: string;
}
