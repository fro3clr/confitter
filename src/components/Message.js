import React from "react";
import moment from "moment";
import "../styles/Message.scss";

const formatDate = date => moment(date).format("l, h:mm:ss");

const Message = ({ message }) =>
  <div className="post">
    <div className="post-user">
      <div className="post-user__portrait">
        <span className="icon fa fa-user-circle-o">
          <img src={message.fromUser.avatarUrlSmall} />
        </span>
      </div>
      <div className="post-user__name">
        {message.fromUser.displayName}
      </div>
    </div>
    <div className="post-body">
      <div className="post-body__content">
        {message.text}
      </div>
      <div className="post-body__date">
        {formatDate(message.sent)}
      </div>
    </div>
  </div>;

export default Message;
