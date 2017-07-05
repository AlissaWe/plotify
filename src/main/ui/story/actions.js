import { CLOSE_STORY, OPEN_STORY, OPEN_STORY_DIALOG } from "../../shared/stories/ipc-channels";
import { sendToModel } from "../../shared/commons/ipc";

export function openStory(file) {
  return sendToModel(OPEN_STORY, file);
}

function closeStory() {
  return sendToModel(CLOSE_STORY);
}

export function openStoryDialog() {
  return new Promise((resolve, reject) => {
    sendToModel(OPEN_STORY_DIALOG)
      .then((file) => {
        if (file) {
          closeStory()
            .then(() => resolve(openStory(file)))
            .catch(e => reject(e));
        } else {
          reject("No Story chosen");
        }
      })
      .catch(e => reject(e));
  });
}
