import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import StatusTextField from "./StatusTextField";
import * as s from "../selectors";
import a from "../actions";
import { palette, spacing } from "../../../themes/PlotifyMainTheme";
import { white } from "material-ui/styles/colors";
import { connectWithState } from "rxr-react";

const style = {
  inputStyle: {
    color: white,
  },
  floatingLabelFocusStyle: {
    color: white,
  },
  floatingLabelStyle: {
    color: white,
  },
  underlineFocusStyle: {
    borderColor: white,
  },
  nameHeader: {
    zIndex: 1,
    position: "relative",
    height: spacing.desktopToolbarHeight * 2,
    backgroundColor: palette.primary2Color,
    left: 0,
    right: 0,
    padding: spacing.desktopGutterLess,
  },
  nameInput: {
    color: white,
  }
};

class ProfileNameTextFieldComponent extends Component {
  constructor(props) {
    super(props);
    this.handleCharacterChanged = this.handleCharacterChanged.bind(this);
    this.saveCharacterName = this.saveCharacterName.bind(this);
    this.state = {
      value: this.props.value
    };
  }

  handleCharacterChanged(event) {
    this.props.handleCharacterNameChanged(event.target.value);
  }

  saveCharacterName() {
    this.props.saveCharacterName();
  }

  getStyle() {
    let nStyle = style;
    return nStyle;
  }

  render() {
    return (
      <Paper rounded={false}
             zDepth={2}
             style={this.getStyle().nameHeader}>
        <TextField
          floatingLabelText="Name"
          value={this.props.characterName}
          style={this.getStyle().nameInput}
          inputStyle={this.getStyle().inputStyle}
          floatingLabelFocusStyle={this.getStyle().floatingLabelFocusStyle}
          floatingLabelStyle={this.getStyle().floatingLabelStyle}
          underlineFocusStyle={this.getStyle().underlineFocusStyle}
          fullWidth={true}
          onChange={this.handleCharacterChanged}
          onBlur={this.saveCharacterName}
        />
      </Paper>
    );
  }
}

const selector = (state) => ({
  characterName: s.getCharacterName(state),
  // handleCharacterNameChanged: (changedName) => a.setCharacterName(changedName),
  // saveCharacterName: () => a.saveCharacterName(),
});

const ProfileNameTextField = connectWithState(selector )(ProfileNameTextFieldComponent);

export default ProfileNameTextField;
