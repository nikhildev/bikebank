import * as React from 'react';
import styledComponents  from 'styled-components';
import styledComponentsTS  from 'styled-components-ts';


export class SearchResultCardProps {
  bikeId: Number;
  bikeName: String;
};

const MyDiv = styledComponentsTS<{children: string}>(styledComponents.a)`
  color: red;
`;

const SearchResultCard = (props: SearchResultCardProps) => {
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
      <MyDiv>sdfdf</MyDiv>
      {props.bikeId}{props.bikeName}
    </div>
  )
}

export default SearchResultCard;