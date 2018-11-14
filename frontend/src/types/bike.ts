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

export const BIKE_STATUS = {
  IN_POSSESSION: 1,
  SOLD: 3,
  STOLEN: 2,
  UNREGISTERED: 0,
};