import FayeClient from "../additional/faye";
import { addMessage } from "../actions/messages";

export const SUBSCRIBE_TO_MESSAGES = "SUBSCRIBE_TO_MESSAGES";

export const subscribeToMessages = () => (dispatch, getState) => {
  const state = getState();
  const room = state.getIn(["rooms", "choosenRoom"]);

  FayeClient.subscribe("/api/v1/rooms/" + room.id + "/chatMessages", function(
    response
  ) {
    if (response.operation == "create") {
      dispatch(addMessage(response.model));
    }
  });
};
