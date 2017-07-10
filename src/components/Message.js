import React from 'react';
import '../styles/Message.css';

const Message = ({message}) => (
    <div className="post">
        <div className="post-user">
            <div className="post-user__portrait">
                <span className="icon fa fa-user-circle-o">
                    <img src={message.fromUser.avatarUrlSmall}/>
                    </span>
            </div>
            <div className="post-user__name">{message.fromUser.displayName}</div>
        </div>
        <div className="post-body">
            <div className="post-body__content">
                {message.text}
            </div>
            <div className="post-body__date">
                December 4
            </div>
        </div>
    </div>
);

export default Message;