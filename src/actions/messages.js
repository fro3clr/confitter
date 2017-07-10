import fetch from 'isomorphic-fetch'
import config from '../config/config'
import _ from 'lodash'
import withQuery from 'with-query';

export const REQUEST_MESSAGES = 'REQUEST_MESSAGES';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const ADD_PREVIOUS_MESSAGES = 'ADD_PREVIOUS_MESSAGES';

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
    return {
        type: ADD_MESSAGE,
        message
    }
};

export const addPreviousMessages = (messages) => {
    return {
        type: ADD_PREVIOUS_MESSAGES,
        messages
    }
};

const mapJSONToMessages = (json) => _.map(json, (message) => _.pick(message, [
    'id', 'fromUser', 'text'
]));

export const sendMessage = (message) => (dispatch, getState) => {
    const state = getState();
    const roomId = state.getIn(['rooms', 'choosenRoom']);
    if (message) {
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

export const fetchMessages = (limit = 50, beforeId) => (dispatch, getState) => {
    const state = getState();
    const roomId = state.getIn(['rooms', 'choosenRoom']);
    if (roomId) {
        dispatch(requestMessages());

        fetch(withQuery(`https://api.gitter.im/v1/rooms/${roomId}/chatMessages?`, {
            'access_token': config.token,
            limit
        }))
            .then(response => response.json())
            .then(json => mapJSONToMessages(json))
            .then(messages => dispatch(receiveMessages(messages)))
    }
};

export const loadMoreMessages = () => (dispatch, getState) => {
    const state = getState();
    const roomId = state.getIn(['rooms', 'choosenRoom']);
    const beforeId = state.getIn(['messages', 'list']).first().get('id');

    if (beforeId) {
        fetch(withQuery(`https://api.gitter.im/v1/rooms/${roomId}/chatMessages?`, {
            'access_token': config.token,
            limit: 50,
            beforeId
        }))
            .then(response => response.json())
            .then(json => mapJSONToMessages(json))
            .then(messages => dispatch(addPreviousMessages(messages)))
    }
};