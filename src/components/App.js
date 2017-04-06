import React, {Component} from 'react';
import logo from '../logo.svg';
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
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to Confitter app</h2>
                </div>
                <div className="App-content">
                    <Rooms rooms={this.props.rooms}
                           chooseRoom={this.props.chooseRoom}
                           fetchMessages={this.props.fetchMessagesIfNeeded}
                    />
                    <User user={this.props.user}/>
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