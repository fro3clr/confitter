import React from 'react';

const User = ({user}) => (
    <div className="user">
        {user && !user.get('isFetching') && 
        <div className="User-info">
        <span className="User-name"> 
           You logged as: {user.get('username')}
        </span>
        <div className='User-avatar'>
        <img src={user.get('avatarUrlSmall')}/>
        </div>
          </div>
}
    </div>
);

export default User;