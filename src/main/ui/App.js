import React, { Component } from "react";
import AppBar from "./components/AppBar";
import Drawer from "./components/Drawer";
import CharacterSection from "./characters/components/CharacterSection";
import * as actions from "./story/actions";
import ActionMenu from "./story/components/ActionMenu";

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
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <AppBar
          title="Plotify"
          actionMenu={
            <div>
              <button
                id="demo-menu-lower-right"
                className="mdl-button mdl-js-button mdl-button--icon"
              >
                <i className="material-icons">more_vert</i>
              </button>
              <ActionMenu
                openStoryDialog={ this.openStoryDialog }
                storyOpen={ this.state.story !== "" }
              />
            </div>
          }
        />
        <Drawer />
        <main className="mdl-layout__content">
          {
            this.state.story &&
            <CharacterSection story={ this.state.story } />
          }
        </main>
      </div>
    );
  }
}
