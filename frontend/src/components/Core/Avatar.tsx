import * as React from 'react';

interface IProps {
  user: firebase.User;
}

const Avatar: React.FunctionComponent<IProps> = props => {
  const photoUrl: string = props.user.photoURL || '';
  const displayName: string = props.user.displayName || '';

  return (
    <div
      className="avatar-md"
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <img
        style={{
          height: 32,
          width: 32,
          borderRadius: '50%',
        }}
        src={photoUrl}
        alt={photoUrl}
      />
      <label
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: 'white',
          marginLeft: 8,
        }}
      >
        {displayName}
      </label>
    </div>
  );
};

export default Avatar;
