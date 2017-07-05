import React, { Component } from "react";
import AppBar from "./components/AppBar";
import Drawer from "./components/Drawer";
import CharacterSection from "./characters/components/CharacterSection";
import * as actions from "./story/actions";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.openStoryDialog = this.openStoryDialog.bind(this);
    this.state = {
      story: "",
      error: "",
    };
  }

  openStoryDialog() {
    actions.openStoryDialog()
      .then((story) => this.setState({ story }))
      .catch((e) => console.log(e));
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
            <CharacterSection story={ this.state.story } />
          }
        </main>
      </div>
    );
  }
}
