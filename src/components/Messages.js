import React from 'react';

const Messages = ({messages}) => (
       <div className="messages">
        <ul className="messages-list">
            {messages
                ? messages.get('list').map((message, messageIndex) => (
                    <li>{message.get('text')}</li>
                ))
                : null
            }

        </ul>
    </div>
);

export default Messages;