export class Bike {
  constructor (
    public id: string,
    public serial: string,
    public status: number,
    public ownerId?: string,
    public purchaseDate?: string,
    public make?: string,
    public model?: string,
    public color?: string,
    public description?: string,
    public accessories?: string,
  ) {}
}

export enum BIKE_STATUS {
  UNREGISTERED,
  IN_POSSESSION,
  STOLEN,
  SOLD,
};