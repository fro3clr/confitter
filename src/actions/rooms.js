import fetch from "isomorphic-fetch";
import { fetchMessages } from "./messages";
import config from "../config/config";
import _ from "lodash";

export const REQUEST_ROOMS = "REQUEST_ROOMS";
export const RECEIVE_ROOMS = "RECEIVE_ROOMS";
export const CHOOSE_ROOM = "CHOOSE_ROOM";

export const requestRooms = () => {
  return {
    type: REQUEST_ROOMS
  };
};

export const receiveRooms = rooms => {
  return {
    type: RECEIVE_ROOMS,
    rooms
  };
};

export const chooseRoom = room => {
  return {
    type: CHOOSE_ROOM,
    room
  };
};

const mapJSONToRooms = json =>
  _.map(json, room =>
    _.pick(room, [
      "id",
      "name",
      "topic",
      "oneToOne",
      "users",
      "userCount",
      "unreadItems",
      "mentions",
      "lastAccessTime",
      "favourite",
      "lurk",
      "url",
      "tags",
      "v"
    ])
  );

const fetchRooms = state => dispatch => {
  const userId = state.getIn(["user", "id"]);
  dispatch(requestRooms());
  fetch(
    `https://api.gitter.im/v1/user/${userId}/rooms?access_token=${config.token}`
  )
    .then(response => response.json())
    .then(json => mapJSONToRooms(json))
    .then(rooms => {
      dispatch(receiveRooms(rooms));

      //choose first room, if choosenRoom empty
      if (!state.getIn(["rooms", "choosenRoom"])) {
        dispatch(chooseRoom(rooms["0"]));
        dispatch(fetchMessages());
      }
    });
};

const shouldFetchRooms = state => {
  const rooms = state.get("rooms");

  return !rooms || !rooms.get("isFetching");
};

export const fetchRoomsIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchRooms(getState())) {
    return dispatch(fetchRooms(getState()));
  }
};
