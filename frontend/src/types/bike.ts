import * as Yup from 'yup';

import { ILatLongLocation } from './common';
export interface Bike {
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
  1: 'In Possession',
  2: 'Stolen',
  3: 'Sold',
};

export interface BikeDispatchProps {
  isFetching: boolean;
  lastUpdated?: number;
  items: Bike[];
  hasError?: Boolean;
}

export const BIKE_VALIDATION_SCHEMA = Yup.object().shape({
  serial: Yup.string()
    .min(6, 'Serial too short(min 6 chars)')
    .max(10, 'Serial too long. (max 10 chars)')
    .required('Serial(required)'),
  make: Yup.string()
    .min(1, 'Bike make cannot be empty')
    .max(30, 'Bike make name too long. (max 30 chars)')
    .required('Make(required)'),
  status: Yup.number().required(),
  purchaseDate: Yup.date().max(new Date(), 'Purchase date cannot be in the future'),
});
