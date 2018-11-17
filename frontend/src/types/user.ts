export class User {
  constructor (
    public uid: string,
    public displayName: string,
    public email: string,
    public accessToken: string,
    public photoUrl?: string,
    public refreshToken?: string,
  ) {}
}
