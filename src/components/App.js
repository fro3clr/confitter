import React, {Component} from 'react';
import logo from '../logo.svg';
import {connect} from 'react-redux';
import '../App.css';
import User from './User';
import Rooms from './Rooms';
import {fetchUserIfNeeded} from '../actions/user';
import {fetchRoomsIfNeeded} from '../actions/rooms';
import {chooseRoom} from '../actions/rooms';

class App extends Component {
  componentDidMount() {
   this.props.fetchUserIfNeeded()
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to Confitter app</h2>
        </div>
        <div className="App-content">
          <User user={this.props.user}/>
          <Rooms rooms={this.props.rooms} 
                 chooseRoom={this.props.chooseRoom}
          />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => state.toObject();

const AppContainer = connect(mapStateToProps, {
     chooseRoom,
     fetchUserIfNeeded,
     fetchRoomsIfNeeded
 })(App);

export default AppContainer;