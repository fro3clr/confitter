import React from "react";
import Message from "./Message";
import "../styles/Messages.scss";
import ChatView from "react-chatview";
import _ from "lodash";

const handleKeyDown = sendMessage => event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    sendMessage(event.target.value);
    event.target.value = "";
  }
};

const onInfiniteLoad = loadMoreMessages => () => {
  return new Promise(resolve => {
    loadMoreMessages();
    resolve();
  });
};

const mapMessages = messages =>
  _.map(messages, message => <Message message={message} />);

const Messages = ({ messages, currentRoom, sendMessage, loadMoreMessages }) =>
  <div className="messages">
    <h1>
      {currentRoom.name}
    </h1>
    <ul className="messages-list">
      <ChatView
        className="messages-list"
        flipped={true}
        onInfiniteLoad={onInfiniteLoad(loadMoreMessages)}
      >
        {mapMessages(messages)}
      </ChatView>
    </ul>
    <div className="message">
      <textarea
        onKeyDown={handleKeyDown(sendMessage)}
        placeholder="Enter your message"
      />
    </div>
  </div>;

export default Messages;
