import React from "react";
import { connect } from "react-redux";
import "../App.scss";
import User from "./User";
import Rooms from "./Rooms";
import Messages from "./Messages";
import { fetchUserIfNeeded } from "../actions/user";
import { fetchRoomsIfNeeded } from "../actions/rooms";
import {
  fetchMessages,
  sendMessage,
  loadMoreMessages
} from "../actions/messages";
import { chooseRoom } from "../actions/rooms";
import { subscribeToMessages } from "../actions/faye";

class App extends React.Component {
  render() {
    return (
      <div className="app wrapper">
        <nav>
          <header>
            <span />
            Confitter
            <a />
          </header>
          <User user={this.props.user} />
          <Rooms
            rooms={this.getRooms()}
            chooseRoom={this.props.chooseRoom}
            fetchMessages={this.props.fetchMessages}
            subscribeToMessages={this.props.subscribeToMessages}
          />
        </nav>
        <main>
          <a className="button" />
          <Messages
            messages={this.getMessages()}
            currentRoom={this.getCurrentRoom()}
            sendMessage={this.props.sendMessage}
            loadMoreMessages={this.props.loadMoreMessages}
          />
        </main>
      </div>
    );
  }

  componentWillMount() {
    this.props.fetchUserIfNeeded();
  }

  getMessages() {
    const messages = this.props.messages;

    return messages && messages.get("list").size > 0
      ? messages.toJS().list.reverse()
      : [];
  }

  getRooms() {
    const rooms = this.props.rooms;

    return rooms && rooms.get("list").size > 0 ? rooms.toJS().list : [];
  }

  getCurrentRoom() {
    const rooms = this.props.rooms;

    return rooms && rooms.get("choosenRoom") ? rooms.get("choosenRoom") : "";
  }
}

const mapStateToProps = state => state.toObject();

const AppContainer = connect(mapStateToProps, {
  chooseRoom,
  subscribeToMessages,
  fetchUserIfNeeded,
  fetchRoomsIfNeeded,
  fetchMessages,
  sendMessage,
  loadMoreMessages
})(App);

export default AppContainer;
