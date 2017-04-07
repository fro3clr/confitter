import {REQUEST_USER, RECEIVE_USER} from '../actions/user';
import {REQUEST_ROOMS, RECEIVE_ROOMS, CHOOSE_ROOM} from '../actions/rooms';
import {REQUEST_MESSAGES, RECEIVE_MESSAGES} from '../actions/messages';
import user from './user';
import rooms from './rooms';
import messages from './messages';

const rootReducer = (state, action) => {
    switch (action.type) {
        case REQUEST_USER:
        case RECEIVE_USER:
            return user(state, action);
        case RECEIVE_ROOMS:
        case CHOOSE_ROOM:
        case REQUEST_ROOMS:
            return rooms(state, action);
        case RECEIVE_MESSAGES:
        case REQUEST_MESSAGES:
            return messages(state, action);
        default:
            return state
    }
};

export default rootReducer;