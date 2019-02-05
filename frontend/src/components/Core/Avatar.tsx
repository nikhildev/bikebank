import * as React from 'react';

interface IProps {
  photoUrl: string | null | undefined,
  displayName?: string | null | undefined,
}

const Avatar: React.FunctionComponent<IProps> = (props) => {
  const photoUrl: string = props.photoUrl || '';
  const displayName: string = props.displayName || '';

  return <React.Fragment>
    <img
      style={{
        height: 32,
        width: 32,
      }}
      src={photoUrl}
      alt={photoUrl} />
    <label>{displayName}</label>

  </React.Fragment>
}

export default Avatar;