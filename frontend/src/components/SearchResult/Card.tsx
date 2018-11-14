import * as React from 'react';

import { Bike } from '../../types/bike';

const SearchResultCard = (props: Bike) => {
  return (
    <div style={{
      backgroundColor: '#eee',
      border: '1px solid #ddd',
      borderRadius: 3,
      boxShadow: '1px 1px 2px 2px #eee',
      height: 72,
      padding: 16,
      width: 64,
    }}>
      {props.id}{props.serial}
    </div>
  )
}

export default SearchResultCard;