import React from 'react';
import {connect} from 'react-redux';
import '../App.css';
import User from './User';
import Rooms from './Rooms';
import Messages from './Messages';
import {fetchUserIfNeeded} from '../actions/user';
import {fetchRoomsIfNeeded} from '../actions/rooms';
import {fetchMessagesIfNeeded} from '../actions/messages';
import {chooseRoom} from '../actions/rooms';

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
                           fetchMessages={this.props.fetchMessagesIfNeeded}
                    />
                </div>
                <div className='content isOpen'>
                    <a className='button' />
                    <Messages messages={this.props.messages}/>
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
    fetchUserIfNeeded,
    fetchRoomsIfNeeded,
    fetchMessagesIfNeeded
})(App);

export default AppContainer;