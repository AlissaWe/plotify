import React, { Component } from "react";
import { OPEN_STORY, OPEN_STORY_DIALOG } from "../shared/stories/ipc-channels";
import { sendToModel } from "../shared/commons/ipc";
import AppBar from "./components/AppBar";
import Drawer from "./components/Drawer";
import CharacterSection from "./characters/components/CharacterSection";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.openStoryDialog = this.openStoryDialog.bind(this);
    this.openStoryIfFileSelected = this.openStoryIfFileSelected.bind(this);
    this.state = {
      story: "",
      error: "",
    };
  }

  openStoryDialog() {
    // todo: move to actions
    sendToModel(OPEN_STORY_DIALOG)
      .then((file) => this.openStoryIfFileSelected(file))
      .then((story) => this.setState({ story }))
      //.then(() => sendToModel(FIND_CHARACTERS, { deleted: false, filter: "" }))
      //.then((characters) => this.setState({ characters }))
      .catch((error) => this.setState({ error }));
  }

  openStoryIfFileSelected(file) {
    // todo: move to actions
    if (file) {
      return sendToModel(OPEN_STORY, file);
    }
    const error = "No Story Chosen";
    console.log(error);
    return Promise.reject(error);
  }

  render() {
    // todo: fix drawer...
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <AppBar title="Plotify" />
        <Drawer />
        <main className="mdl-layout__content">
          <button
            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
            onClick={ this.openStoryDialog }
          >
            Open Story
          </button>
          {
            this.state.story &&
            <CharacterSection />
          }
        </main>
      </div>
    );
  }
}
