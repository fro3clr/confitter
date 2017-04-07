import React from 'react';

const User = ({user}) => (
    <div className="user">
        {user && !user.get('isFetching') &&
        <div className="user-info">
            <div className="user-name">
                You logged as: {user.get('username')}
            </div>
            <div className='user-avatar'>
                <img src={user.get('avatarUrlSmall')}/>
            </div>
        </div>
        }
    </div>
);

export default User;