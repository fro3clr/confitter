import React from 'react';
import Message from './Message';

const Messages = ({messages}) => (
       <div className="messages">
        <ul className="messages-list">
            {messages
                ? messages.get('list').map((message, messageIndex) => (
                   <Message message={message}/>
                ))
                : null
            }
        </ul>
    </div>
);

export default Messages;