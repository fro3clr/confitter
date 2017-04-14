import React from 'react';
import Message from './Message';
import '../styles/Messages.css';

const handleKeyDown = (sendMessage) => (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        sendMessage(event.target.value);
        event.target.value = '';
    }
};

const Messages = ({messages, sendMessage}) => (
    <div className="messages">
        <ul className="messages-list">
            {messages
                ? messages.get('list').map((message, messageIndex) => (
                    <Message message={message}/>
                ))
                : null
            }
        </ul>
        <div className="message">
            <textarea onKeyDown={handleKeyDown(sendMessage)} placeholder="Enter your message"/>
        </div>
    </div>
);

export default Messages;