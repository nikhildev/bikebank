import * as React from 'react';

export class SearchResultCardProps {
  public bikeId: number;
  public bikeName: string;
};

const SearchResultCard = (props: SearchResultCardProps) => {
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
      {props.bikeId}{props.bikeName}
    </div>
  )
}

export default SearchResultCard;