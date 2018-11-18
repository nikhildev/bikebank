export class User {
  constructor (
    public uid: string | null,
    public displayName: string | null,
    public email: string | null,
    public photoUrl?: string | null,
  ) {}
}
