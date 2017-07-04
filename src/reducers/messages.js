import {fromJS} from 'immutable';
import {REQUEST_MESSAGES, RECEIVE_MESSAGES, ADD_MESSAGE} from '../actions/messages';

const messages = (state, action) => {
    switch (action.type) {
        case REQUEST_MESSAGES:
            return state.set('messages', fromJS({isFetching: true, list: []}));
        case ADD_MESSAGE:
            return state.setIn([
                'messages', 'list'
            ], state.getIn(['messages', 'list']).push(fromJS(action.message)))
        case RECEIVE_MESSAGES:
            return state.setIn([
                'messages', 'isFetching'
            ], false).mergeIn([
                'messages', 'list'
            ], action.messages);
        default:
            return state
    }
};

export default messages;