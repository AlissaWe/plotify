import * as t from "./actionTypes";
import { isStoryOpen, getOpenStoryFile } from "./selectors";

import { showSnackbar } from "../snackbar/actions";

import * as c from "../../shared/stories/ipc-channels";
import { sendToModel } from "../../shared/commons/ipc";

import path from "path";
import { shell } from "electron";
import { updateTitle } from "redux-title";

const productName = require("../../package.json").productName;
const fileExtension = ".story";
const storyCreatedMessage = "Deine Geschichte wurde erfolgreich erstellt.";
const storyCreatedActionLabel = "Speicherort öffnen";
const storyCreatedActionCreator = openStoryFileLocation;

export function openStoryDialog() {
  return dispatch => {
    return Promise.resolve()
      .then(() => sendToModel(c.OPEN_STORY_DIALOG))
      .then(file => dispatch(openStoryIfFileSelected(file)))
      .catch(error => console.log("Es wurde keine Geschichte ausgewählt:", error));
  };
}

export function openStory(file) {
  return dispatch => {
    return Promise.resolve()
      .then(() => dispatch(closeIfStoryIsOpen()))
      .then(() => dispatch(openStoryIfNoStoryIsOpen(file)));
  };
}

export function closeStory() {
  return dispatch => {
    return Promise.resolve()
      .then(() => dispatch(closeStoryRequest()))
      .then(() => sendToModel(c.CLOSE_STORY))
      .then(() => dispatch(closeStorySuccessful()))
      .catch(error => dispatch(closeStoryFailed(error)));
  };
}

export function createStory() {
  return dispatch => {
    return Promise.resolve()
      .then(() => dispatch(closeIfStoryIsOpen()))
      .then(() => dispatch(createStoryIfNoStoryIsOpen()));
  };
}

export function openStoryFileLocation() {
  return (dispatch, getState) => {
    shell.showItemInFolder(getOpenStoryFile(getState()));
  };
}

function openStoryIfFileSelected(file) {
  return dispatch => {
    if (file) {
      return Promise.resolve()
        .then(() => dispatch(openStory(file)))
        .then(() => dispatch(showSnackbar("\"" + path.basename(file, fileExtension) + "\" erfolgreich geöffnet")));
    } else {
      return dispatch(showSnackbar("Es wurde keine Geschichte ausgewählt"));
    }
  };
}

function closeIfStoryIsOpen() {
  return (dispatch, getState) => {
    if (isStoryOpen(getState())) {
      return dispatch(closeStory());
    }
  };
}

function openStoryIfNoStoryIsOpen(file) {
  return (dispatch, getState) => {
    if (!isStoryOpen(getState())) {
      return Promise.resolve()
        .then(() => dispatch(openStoryRequest(file)))
        .then(() => sendToModel(c.OPEN_STORY, file))
        .then(() => dispatch(updateTitle(path.basename(file, fileExtension) + " - " + productName)))
        .then(() => dispatch(openStorySuccessful()))
        .catch(error => dispatch(openStoryFailed(error)));
    }
  };
}

function createStoryIfNoStoryIsOpen() {
  return (dispatch, getState) => {
    if (!isStoryOpen(getState())) {
      let createdFile;
      return Promise.resolve()
        .then(() => dispatch(createStoryRequest()))
        .then(() => sendToModel(c.CREATE_STORY))
        .then(file => createdFile = file)
        .then(() => dispatch(createStorySuccessful()))
        .then(() => dispatch(openStory(createdFile)))
        .then(() => dispatch(showSnackbar(
          storyCreatedMessage, storyCreatedActionLabel, storyCreatedActionCreator)))
        .catch(error => dispatch(createStoryFailed(error)));
    }
  };
}

function openStoryRequest(file) {
  return {
    type: t.OPEN_STORY_REQUEST,
    payload: { file }
  };
}

function openStorySuccessful() {
  return {
    type: t.OPEN_STORY_SUCCESSFUL,
    payload: {}
  };
}

function openStoryFailed(error) {
  return {
    type: t.OPEN_STORY_FAILED,
    payload: { error }
  };
}

function closeStoryRequest() {
  return {
    type: t.CLOSE_STORY_REQUEST,
    payload: {}
  };
}

function closeStorySuccessful() {
  return {
    type: t.CLOSE_STORY_SUCCESSFUL,
    payload: {}
  };
}

function closeStoryFailed(error) {
  return {
    type: t.CLOSE_STORY_FAILED,
    payload: { error }
  };
}

function createStoryRequest() {
  return {
    type: t.CREATE_STORY_REQUEST,
    payload: {}
  };
}

function createStorySuccessful() {
  return {
    type: t.CREATE_STORY_SUCCESSFUL,
    payload: {}
  };
}

function createStoryFailed(error) {
  return {
    type: t.CREATE_STORY_FAILED,
    payload: { error }
  };
}
