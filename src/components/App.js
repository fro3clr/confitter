import React from 'react';
import {connect} from 'react-redux';
import '../App.css';
import User from './User';
import Rooms from './Rooms';
import Messages from './Messages';
import {fetchUserIfNeeded} from '../actions/user';
import {fetchRoomsIfNeeded} from '../actions/rooms';
import {fetchMessages, sendMessage, loadMoreMessages} from '../actions/messages';
import {chooseRoom} from '../actions/rooms';
import {subscribeToMessages} from '../actions/faye';

class App extends React.Component {
    render() {
        return (
            <div className='app wrapper'>
                <div className='sidebar'>
                    <div className='title'>
                        Confitter
                    </div>
                    <User user={this.props.user}/>
                    <Rooms rooms={this.props.rooms}
                           chooseRoom={this.props.chooseRoom}
                           fetchMessages={this.props.fetchMessages}
                           subscribeToMessages={this.props.subscribeToMessages}
                    />
                </div>
                <div className='content isOpen'>
                    <a className='button'/>
                    <Messages messages={this.getMessages()}
                              sendMessage={this.props.sendMessage}
                              loadMoreMessages={this.props.loadMoreMessages}/>
                </div>
            </div>
        );
    }

    componentWillMount() {
        this.props.fetchUserIfNeeded()
    }

    getMessages() {
        const messages = this.props.messages;

        return messages && messages.get('list').size > 0
            ? messages.toJS().list.reverse()
            : [];
    }
}

const mapStateToProps = (state) => state.toObject();

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