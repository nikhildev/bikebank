import { ILatLongLocation } from './common';
export interface IBike {
  id: string;
  serial: string;
  status: number;
  ownerId?: string;
  purchaseDate?: string;
  registrationDate?: string;
  make?: string;
  model?: string;
  color?: string;
  description?: string;
  accessories?: string;
  lastSeenLocation?: ILatLongLocation;
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
  items: IBike[];
  hasError?: Boolean;
}
