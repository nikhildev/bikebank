import * as React from 'react';

import './Card.css';
import { BIKE_STATUS_LABELS, Bike } from '../../types/bike';

interface IProps {
  key: string;
  id: string;
  bike: Bike;
}

const SearchResultCard = (props: IProps) => {
  return (
    <div className="BikeCard">
      <h3>Serial: {props.bike.serial}</h3>
      <span>Make: {props.bike.make}</span>
      <span>Model: {props.bike.model}</span>
      <span>Status: {BIKE_STATUS_LABELS[props.bike.status]}</span>
    </div>
  );
};

export default SearchResultCard;
