import { fromJS } from "immutable";
import { REQUEST_ROOMS, RECEIVE_ROOMS, CHOOSE_ROOM } from "../actions/rooms";

const rooms = (state, action) => {
  switch (action.type) {
    case REQUEST_ROOMS:
      return state.set("rooms", fromJS({ isFetching: true, list: [] }));
    case RECEIVE_ROOMS:
      return state
        .setIn(["rooms", "isFetching"], false)
        .mergeIn(["rooms", "list"], action.rooms);
    case CHOOSE_ROOM:
      return state.setIn(["rooms", "choosenRoom"], action.room);
    default:
      return state;
  }
};

export default rooms;
