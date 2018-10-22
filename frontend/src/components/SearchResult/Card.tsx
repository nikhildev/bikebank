import * as React from 'react';

export class Props {
  bikeId: Number;
  bikeName: String;
};

const SearchResultCard = (props: Props) => {
  return (
    <div style={{
      backgroundColor: '#eee',
      padding: 16,
      width: 64,
      height: 72,
      border: '1px solid #ddd',
      borderRadius: 3,
      boxShadow: '1px 1px 2px 2px #eee',
    }}>
      {props.bikeId}{props.bikeName}
    </div>
  )
}

export default SearchResultCard;