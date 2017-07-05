import React, { Component, PropTypes } from "react";
import { ListItem } from "../../components/List";
const NO_NAME = "Kein Name";

export default class CharacterListItem extends Component {
  render() {
    return (
      <ListItem
        caption={ this.props.name || NO_NAME }
        handleSelect={ this.props.handleSelect }
        selected={ this.props.selected }
        leftIcon="person"
      />
    );
  }
}

CharacterListItem.propTypes = {
  name:         PropTypes.string.isRequired,
  deleted:      PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]).isRequired,
  handleSelect: PropTypes.func.isRequired,
  selected:     PropTypes.bool.isRequired,
};

CharacterListItem.defaultProps = {
  name:     NO_NAME,
  selected: false,
};
