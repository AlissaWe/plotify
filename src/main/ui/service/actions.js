import {
  CHANGE_SECTION,
  CLEAR_CHARACTERS,
  CLOSE_MSG,
  DESELECT_CHARACTER,
  RECEIVE_CAN_REDO,
  RECEIVE_CAN_UNDO,
  RECEIVE_CHARACTERS,
  RECEIVE_PROFILE,
  RECEIVE_REDO,
  RECEIVE_STORY,
  RECEIVE_UNDO,
  REQUEST_CAN_REDO,
  REQUEST_CAN_UNDO,
  REQUEST_CHARACTER,
  REQUEST_CHARACTERS,
  REQUEST_PROFILE,
  REQUEST_REDO,
  REQUEST_STORY,
  REQUEST_UNDO,
  SELECT_CHARACTER,
  SET_FILTER,
  SHOW_MSG,
  SHOW_SUCCESS_MSG,
  UPDATE_UI_PROFILE
} from "./action-types";
import {sendToModel} from "../../shared/commons/ipc";
import {
  CAN_REDO_CHARACTER_CHANGE,
  CAN_UNDO_CHARACTER_CHANGE,
  CREATE_CHARACTER,
  FIND_CHARACTERS,
  GET_CHARACTER_PROFILE,
  REDO_CHARACTER_CHANGE,
  UNDO_CHARACTER_CHANGE,
  UPDATE_CHARACTER
} from "../../shared/characters/ipc-channels";
import {CLOSE_STORY, CREATE_STORY, OPEN_STORY, OPEN_STORY_DIALOG} from "../../shared/stories/ipc-channels";
import Sections from "../constants/sections";
import path from "path";
import {shell} from "electron";

// Communication State
export function sectionIsLoading(trueOrFalse) {
  return {
    type: "TOGGLE_SECTION_LOADING",
    payload: trueOrFalse
  };
}

// UI ACTIONS

export function showMessage(message) {
  return {
    type: SHOW_MSG,
    payload: {message}
  };
}

export function showSuccessMessage(message = "Success", withAction = false) {
  return {
    type: SHOW_SUCCESS_MSG,
    payload: {
      message: message,
      withAction: withAction
    }
  };
}

export function closeMessage() {
  return {
    type: CLOSE_MSG
  };
}

// SECTIONS
export function changeSection(section) {
  return {
    type: CHANGE_SECTION,
    payload: section
  };
}

// CHARACTER
export function selectCharacter(character) {
  return {
    type: SELECT_CHARACTER,
    payload: character
  };
}

export function deselectCharacter() {
  return {
    type: DESELECT_CHARACTER,
    payload: {}
  };
}

export function setFilter(filter = "") {
  return {
    type: SET_FILTER,
    payload: filter
  };
}

export function requestCharacter(uuid = "") {
  return {
    type: REQUEST_CHARACTER,
    payload: uuid
  };
}

export function updateSelectedCharacter(character) {
  return {
    type: "UPDATE_CHARACTER",
    payload: character
  };
}

// TODO
export function updateUiProfile(profileChanges) {
  return {
    type: UPDATE_UI_PROFILE,
    payload: profileChanges
  };
}

export function createCharacter() {
  return function (dispatch) {
    dispatch(requestCharacter());
    return sendToModel(CREATE_CHARACTER)
      .then(uuid => {
        dispatch(showMessage("Neuer Charakter erfolgreich erstellt."));
        return Promise.resolve(uuid);
      })
      .then(uuid => {
        dispatch(findCharacters());
        return Promise.resolve(uuid);
      })
      .then(uuid => {
        dispatch(canUndoCharacterChange(uuid));
        return Promise.resolve(uuid);
      })
      .then(uuid => {
        dispatch(canRedoCharacterChange(uuid));
        return Promise.resolve(uuid);
      })
      .then(uuid=> {
        dispatch(getCharacterProfile(uuid));
        return Promise.resolve(uuid);
      })
      .then(uuid => {
        dispatch(selectCharacter({id: uuid, name: ""}));
        return Promise.resolve(uuid);
      })
      .catch((error) => console.log(error));
  };
}

export function requestCharacterProfile() {
  return {
    type: REQUEST_PROFILE,
  };
}

export function getCharacterProfile(uuid = "") {
  return (dispatch) => {
    dispatch(requestCharacterProfile());
    return sendToModel(GET_CHARACTER_PROFILE, uuid)
      .then(profile => {
        dispatch(receiveCharacterProfile(profile));
        return Promise.resolve(profile);
      })
      .catch(error => console.log(error));
  };
}

export function updateCharacter(characterId, changeType, typeId, changes) {
  return function (dispatch) {
    dispatch(requestCharacter());
    console.log("CHANGES", characterId, changeType, typeId, changes);
    return sendToModel(UPDATE_CHARACTER,
      {
        characterId: characterId,
        type: changeType,
        typeId: typeId,
        changes
      })
      .then(uuid => {
        dispatch(canUndoCharacterChange(uuid));
        return Promise.resolve(uuid);
      })
      .then(uuid => {
        dispatch(canRedoCharacterChange(uuid));
        return Promise.resolve(uuid);
      })
      .then((uuid) => {
        dispatch(showMessage("Änderungen erfolgreich gespeichert."));
        return Promise.resolve(uuid);
      })
      .then(uuid => {
        dispatch(findCharacters());
        return Promise.resolve(uuid);
      });
  };
}

export function requestCharacters() {
  return {
    type: REQUEST_CHARACTERS,
    payload: {}
  };
}

export function receiveCharacters(characters) {
  return {
    type: RECEIVE_CHARACTERS,
    payload: characters
  };
}

export function findCharacters(filter = "") {
  return function (dispatch) {
    dispatch(requestCharacters());
    return sendToModel(FIND_CHARACTERS, {deleted: false, filter})
      .then(characters => dispatch(receiveCharacters(characters)))
      .catch(error => console.log("Could not find characters: ", error));
  };
}

// undo redo
export function requestCanUndo() {
  return {
    type: REQUEST_CAN_UNDO,
  };
}

export function requestCanRedo() {
  return {
    type: REQUEST_CAN_REDO,
  };
}

export function receiveCanUndo(canUndo) {
  return {
    type: RECEIVE_CAN_UNDO,
    payload: canUndo
  };
}

export function receiveCanRedo(canRedo) {
  return {
    type: RECEIVE_CAN_REDO,
    payload: canRedo
  };
}

export function canUndoCharacterChange(id = "") {
  return function (dispatch) {
    dispatch(requestCanUndo());
    return sendToModel(CAN_UNDO_CHARACTER_CHANGE, id)
      .then(canUndo => dispatch(receiveCanUndo(canUndo)));
  };
}

export function canRedoCharacterChange(id = "") {
  return function (dispatch) {
    dispatch(requestCanRedo());
    return sendToModel(CAN_REDO_CHARACTER_CHANGE, id)
      .then(canRedo => dispatch(receiveCanRedo(canRedo)));
  };
}

export function requestUndo() {
  return {
    type: REQUEST_UNDO
  };
}


export function requestRedo() {
  return {
    type: REQUEST_REDO
  };
}

export function receiveUndo(changes) {
  return {
    type: RECEIVE_UNDO,
    payload: changes,
  };
}

export function receiveRedo(changes) {
  return {
    type: RECEIVE_REDO,
    payload: changes,
  };
}

export function receiveCharacterProfile(profile) {
  return {
    type: RECEIVE_PROFILE,
    payload: profile
  };
}

export function undoCharacterChange(id = "") {
  return (dispatch) => {
    dispatch(requestUndo());
    return sendToModel(UNDO_CHARACTER_CHANGE, id)
      .then(changes => {
        // if changes.isCharacter
        dispatch(updateSelectedCharacter(changes));
        // else
        // dispatch(updateUiProfile(changes));
        return Promise.resolve(changes);
      })
      .then(changes => {
        dispatch(canRedoCharacterChange(id));
        return Promise.resolve(changes);
      })
      .then(changes => {
        dispatch(canUndoCharacterChange(id));
        return Promise.resolve(changes);
      })
      .then(changes => dispatch(receiveUndo(changes)))
      .then(changes => dispatch(receiveRedo(changes)))
      .catch(error => console.log("error undoing", error))
      .then(() => dispatch(findCharacters()));
  };
}

export function redoCharacterChange(id = "") {
  console.log("REDOING CHANGES FOR ", id);
  return (dispatch) => {
    dispatch(requestRedo());
    return sendToModel(REDO_CHARACTER_CHANGE, id)
      .then(changes => {
        dispatch(updateSelectedCharacter(changes));
        return Promise.resolve(changes);
      })
      .then(changes => {
        dispatch(canRedoCharacterChange(id));
        return Promise.resolve(changes);
      })
      .then(changes => {
        dispatch(canUndoCharacterChange(id));
        return Promise.resolve(changes);
      })
      .then(changes => dispatch(receiveRedo(changes)))
      .then(changes => dispatch(receiveUndo(changes)))
      .catch(error => console.log("error redoing", error))
      .then(() => dispatch(findCharacters()));
  };
}

// STORIES
export function requestStory(file = "") {
  return {
    type: REQUEST_STORY,
    payload: file,
  };
}

export function receiveStory(file) {
  return {
    type: RECEIVE_STORY,
    payload: file,
  };
}

export function createStory() {
  return function (dispatch) {
    dispatch(sectionIsLoading(true));
    dispatch(requestStory());
    return sendToModel(CREATE_STORY)
      .then(file => {
        console.log("Story created", file);
        const scsMessage = "Deine Geschichte wurde erfolgreich erstellt. ";
        dispatch(showSuccessMessage(scsMessage, true));
        dispatch(openStory(file))
          .then(() => console.log("Opened and character created."))
          .then(() => dispatch(findCharacters()))
          .then(() => dispatch(changeSection(Sections.CHARACTER)))
          .then(() => dispatch(sectionIsLoading(false)));
      });
  };
}

export function openStory(file) {
  return function (dispatch) {
    dispatch(requestStory(file));
    dispatch(deselectCharacter());
    return sendToModel(CLOSE_STORY)
      .then(() => sendToModel(OPEN_STORY, file))
      .then((file) => {
        dispatch(receiveStory(file));
        /* jslint browser: true */
        document.title = path.basename(file, ".story") + " - Plotify";
        dispatch(findCharacters());
      })
      .catch(error => {
        dispatch(sectionIsLoading(false));
        const message = "Could not create or open story: " + error;
        dispatch(showMessage(message));
      });
  };
}

export function openStoryDialog() {
  return function (dispatch) {
    dispatch(sectionIsLoading(true));
    return sendToModel(OPEN_STORY_DIALOG)
      .then((file) => {
        dispatch(openStory(file))
          .then(() => dispatch(changeSection(Sections.CHARACTER)))
          .then(dispatch(sectionIsLoading(false)));
      })
      .catch(error => {
        dispatch(sectionIsLoading(false));
        let message;
        if (error.name === "UnsupportedFileVersionError") {
          message = "Unsupported file version!";
        } else if (error.name === "NoStoryChosenError") {
          message = "No story chosen. Ignore this.";
        } else {
          message = "Could not open story: " + error.name;
        }
        console.log(message);
        dispatch(showMessage(message));
      });
  };
}

export function openStoryFileLocation() {
  return (dispatch, getState) => {
    shell.showItemInFolder(getState().story);
  };
}
