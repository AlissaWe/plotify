import React, { Component, PropTypes } from "react";
import * as s from "../selectors";
import ProfileGroupsList from "./ProfileGroupsList";
import { spacing } from "../../../themes/PlotifyMainTheme";
import ProfileNameTextField from "./ProfileNameTextField";
import { connectWithState } from "rxr-react";
// TODO switch to react-proptypes when autocomplete works
// import PropTypes from "react-proptypes";

const styles = {
  wrapper: {
    height: "100%"
  },
  profileLoading: {
    position: "relative",
    left: "50%",
    marginLeft: -12,
    top: 50,
  },
  profileLoadingWrapper: {
    height: "100%",
  },
};

const entryGroupWrapperStyle = {
  position: "relative",
  overflowY: "auto",
  left: 0,
  right: 0,
  height: "calc(100% - " + spacing.desktopToolbarHeight * 2 + "px)",
};

class CharacterProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: this.props.isLoading,
    };
  }

  getStyle() {
    let nStyle = styles;
    return nStyle;
  }

  render() {
    return (
      <div style={styles.wrapper}>
        {
          this.props.visible &&
          <div style={styles.wrapper}>
            <ProfileNameTextField/>
            <div style={entryGroupWrapperStyle}>
              <ProfileGroupsList />
            </div>
          </div>
        }
        {
          !this.props.visible &&
          <div>
            <h1>Kein Charakter ausgewählt</h1>
          </div>
        }
      </div>
    );
  }
}

CharacterProfileComponent.propTypes = {
  characterId: PropTypes.string,
  visible: PropTypes.bool.isRequired,
};

const selector = (state) => ({
  characterId: s.getCharacterId(state),
  visible: s.isVisible(state),
});

const CharacterProfile = connectWithState(selector)(CharacterProfileComponent);

export default CharacterProfile;
