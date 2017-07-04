import React from 'react';
import {connect} from 'react-redux';
import '../App.css';
import User from './User';
import Rooms from './Rooms';
import Messages from './Messages';
import {fetchUserIfNeeded} from '../actions/user';
import {fetchRoomsIfNeeded} from '../actions/rooms';
import {fetchMessages, sendMessage} from '../actions/messages';
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
                    <a className='button' />
                    <Messages messages={this.props.messages} sendMessage={this.props.sendMessage}/>
                </div>
            </div>
        );
    }

    componentWillMount() {
        this.props.fetchUserIfNeeded()
    }
}

const mapStateToProps = (state) => state.toObject();

const AppContainer = connect(mapStateToProps, {
    chooseRoom,
    subscribeToMessages,
    fetchUserIfNeeded,
    fetchRoomsIfNeeded,
    fetchMessages,
    sendMessage
})(App);

export default AppContainer;