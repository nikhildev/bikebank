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

export enum BikeStatus {
  Unregistered,
  InPossession,
  Stolen,
  Sold,
}

export const BIKE_STATUS_LABELS = {
  0: 'Unregistered',
  1: "In owner's possession",
  2: 'REPORTED STOLEN',
  3: 'REPORTED SOLD',
};

export interface IBikeDispatchProps {
  isFetching: boolean;
  lastUpdated?: number;
  items: string[];
  hasError?: Boolean;
}
