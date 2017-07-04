import fetch from 'isomorphic-fetch'
import config from '../config/config'
import _ from 'lodash'
import {fromJS} from 'immutable'


export const REQUEST_MESSAGES = 'REQUEST_MESSAGES';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const ADD_MESSAGE      = 'ADD_MESSAGE';

export const requestMessages = () => {
    return {
        type: REQUEST_MESSAGES
    }
};

export const receiveMessages = (messages) => {
    return {
        type: RECEIVE_MESSAGES,
        messages
    }
};

export const addMessage = (message) => {
//     message = _.pick(message, [
//    'id', 'fromUser', 'text'
// ])

// console.log(message);
    return {
        type: ADD_MESSAGE,
        message
    }
}

const mapJSONToMessages = (json) => _.map(json, (message) => _.pick(message, [
    'id', 'fromUser', 'text'
]));

export const sendMessage = (message) => (dispatch, getState) => {
    const state = getState();
    const roomId = state.getIn(['rooms', 'choosenRoom']);
    if(message) {
        fetch(`https://api.gitter.im/v1/rooms/${roomId}/chatMessages?access_token=${config.token}`,
            {
                method: 'POST',
                body: JSON.stringify({
                    text: message
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    }
};

export const fetchMessages = () => (dispatch, getState) => {
    const state = getState();
    const roomId = state.getIn(['rooms', 'choosenRoom']);
    if(roomId) {
        dispatch(requestMessages());
        fetch(`https://api.gitter.im/v1/rooms/${roomId}/chatMessages?limit=50&access_token=${config.token}`)
            .then(response => response.json())
            .then(json => mapJSONToMessages(json))
            .then(messages => dispatch(receiveMessages(messages)))
    }
};