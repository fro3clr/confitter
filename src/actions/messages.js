import fetch from 'isomorphic-fetch'
import config from '../config/config'
import _ from 'lodash'

export const REQUEST_MESSAGES = 'REQUEST_MESSAGES';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';

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

const mapJSONToMessages = (json) => _.map(json, (message) => _.pick(message, [
    'id',
    'fromUser',
    'text'
]));

const fetchMessages = (state) => dispatch => {
    const roomId = state.getIn(['rooms', 'choosenRoom']);
    dispatch(requestMessages());
    fetch(`https://api.gitter.im/v1/rooms/${roomId}/chatMessages?limit=50&access_token=${config.token}`)
        .then(response => response.json())
        .then(json => mapJSONToMessages(json))
        .then(messages => dispatch(receiveMessages(messages)))
};

export const fetchMessagesIfNeeded = () => (dispatch, getState) => {
  return dispatch(fetchMessages(getState()))
};