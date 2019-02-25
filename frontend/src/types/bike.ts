export interface IBike {
  id: string;
  serial: string;
  status: number;
  ownerId?: string;
  purchaseDate?: string;
  make?: string;
  model?: string;
  color?: string;
  description?: string;
  accessories?: string;
}

export enum BIKE_STATUS {
  UNREGISTERED,
  IN_POSSESSION,
  STOLEN,
  SOLD,
}

export const fakeData: IBike[] = [
  {
    id: '1',
    serial: '123',
    status: 1,
    ownerId: '111',
    purchaseDate: '111',
    make: 'Scott',
    model: 'Navajo',
    color: 'Black',
    description: 'Very nice bike',
    accessories: 'Mobile pouch',
  },
];
