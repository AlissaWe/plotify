import { OPEN_STORY, OPEN_STORY_DIALOG } from "../../shared/stories/ipc-channels";
import { sendToModel } from "../../shared/commons/ipc";
import { sendCallback } from "../utils/actions";
import { FIND_CHARACTERS } from "../../shared/characters/ipc-channels";

// todo: make promises instead of callbacks?

export function openStory(file, successCallback, errorCallback) {
  if (file) {
    sendToModel(OPEN_STORY, file)
      .then((story) => sendCallback(() => successCallback(story)))
      .catch((error) => sendCallback(() => {
        console.log(error);
        errorCallback(error);
      }));
  } else {
    console.log("No File Selected", file);
    sendCallback(errorCallback);
  }
}
