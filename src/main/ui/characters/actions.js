import { sendToModel } from "../../shared/commons/ipc";
import { GET_CHARACTER_PROFILE, UPDATE_CHARACTER } from "../../shared/characters/ipc-channels";
import { sendCallback } from "../utils/actions";

// todo: make promises instead of callbacks ?

export function updateCharacter(params, successCallback, errorCallback) {
  sendToModel(UPDATE_CHARACTER, params)
    .then(() => {
      console.log("Character saved successfully", params);
      sendCallback(successCallback);
    })
    .catch((error) => {
      console.log("Error saving Character", params, error);
      sendCallback(() => errorCallback(error));
    });
}

export function loadProfile(id, successCallback, errorCallback) {
  sendToModel(GET_CHARACTER_PROFILE, id)
    .then((groups) => {
      sendCallback(() => successCallback(groups));
    })
    .catch((error) => {
      console.log("ERR", error);
      sendCallback(() => errorCallback(error));
    });
}

