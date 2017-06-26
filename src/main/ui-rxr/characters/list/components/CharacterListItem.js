import React, { Component, PropTypes } from "react";
import { palette } from "../../../themes/PlotifyMainTheme";
import { Avatar, ListItem } from "material-ui";
import { fade } from "material-ui/utils/colorManipulator";
import a from "../actions";
import * as s from "../selectors";
import { connectWithState } from "rxr-react";
// TODO switch to react-proptypes when autocomplete works
// import PropTypes from "react-proptypes";

const style = {
  letterAvatar: {
    margin: 5
  },
  selected: {
    backgroundColor: palette.primary2Color,
    color: palette.alternateTextColor,
  }
};

class CharacterListItemComponent extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      selected: false
    }
  }

  handleClick() {
    Promise.resolve()
      .then(() => this.setState({ selected: true }))
      .then(() => {
        if (this.props.selectedCharacterId !== this.props.characterId) {
          this.props.onSelectItem(this.props.characterId);
        }
      })
  }

  componentWillReceiveProps(nextProps) {
    const willBeSelected = nextProps.selectedCharacterId === nextProps.characterId;
    if (willBeSelected !== this.state.selected) {
      this.setState({
        selected: willBeSelected
      });
    }
  }

  getStyle() {
    let propStyle = style;
    if (!this.state.selected) {
      propStyle.selected = {};
      propStyle.letterAvatar = {
        margin: 5
      }
    } else {
      propStyle.selected = {
        backgroundColor: palette.primary2Color,
        color: palette.alternateTextColor,
      };
      propStyle.letterAvatar = {
        margin: 5,
        backgroundColor: palette.primary1Color,
        color: palette.alternateTextColor
      }
    }
    return propStyle;
  }

  render() {
    return (
      <ListItem
        style={this.getStyle().selected}
        onTouchTap={this.handleClick}
        hoverColor={fade(palette.primary2Color, 0.54)}
        primaryText={this.props.name || "Kein Name"}
        leftAvatar={
          <Avatar
            size={30}
            style={this.getStyle().letterAvatar}>
            {this.props.name.charAt(0)}
          </Avatar>
        }
      />
    );
  }
}

CharacterListItemComponent.propTypes = {
  selectedCharacterId: PropTypes.string,
  onSelectItem: PropTypes.func.isRequired,
};

const selector = (state) => ({
  selectedCharacterId: s.getSelectedCharacterId(state),
  onSelectItem: a.selectCharacter
});

const CharacterListItem = connectWithState(selector)(CharacterListItemComponent);

export default CharacterListItem;
