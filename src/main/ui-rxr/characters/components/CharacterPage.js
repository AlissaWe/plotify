import React, { PropTypes, Component } from "react";
import { connect } from "react-redux";

import { white } from "material-ui/styles/colors";
import { FloatingActionButton, Paper } from "material-ui";
import { CircularProgress } from "material-ui";
import ContentAdd from "material-ui/svg-icons/content/add";

import { spacing } from "../../themes/PlotifyMainTheme";

import CharacterList from "../list/components/CharacterList";
import { connectWithState } from "rxr-react";
// import CharacterProfile from "../profile/components/CharacterProfile";

// import creation from "../creation";
// TODO switch to react-proptypes when autocomplete works
// import PropTypes from "react-proptypes";

const styles = {
  root: {
    width: "100%",
    height: "100%",
  },
  listPaper: {
    position: "absolute",
    height: "100%",
    zIndex: 2,
    background: white,
    minWidth: 350,
    width: 350,
    display: "inline-block",
  },
  profile: {
    position: "absolute",
    height: "100%",
    left: 406,
    right: 0,
  },
  addCharacterButtonLeft: {
    position: "absolute",
    color: white,
    right: spacing.desktopToolbarHeight / 2,
    top: 36,
  },
  addCharacterButton: {
    position: "absolute",
    color: white,
    left: spacing.desktopToolbarHeight * -1 / 2,
    marginLeft: "50%",
    bottom: 24,
  }
};

class CharacterPageComponent extends Component {

  constructor(props) {
    super(props);
    this.createCharacter = this.createCharacter.bind(this);
  }

  createCharacter() {
    this.props.createCharacter();
  }

  render() {
    return (
      <div id="CharacterPage" style={styles.root}>
        <Paper zDepth={1} style={styles.listPaper}>
          <CharacterList />
          <FloatingActionButton
            style={styles.addCharacterButton}
            onTouchTap={this.createCharacter}>
            <ContentAdd  />
          </FloatingActionButton>
        </Paper>

        <div style={styles.profile}>
        </div>
      </div>
    );
  }
}

CharacterPageComponent.propTypes = {
  // createCharacter: PropTypes.func.isRequired,
};

const selector = (state) => ({
  // createCharacter: creation.actions.createCharacter,
});

const CharacterPage = connectWithState(selector)(CharacterPageComponent);

export default CharacterPageComponent;
