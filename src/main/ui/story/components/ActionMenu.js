import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem, Divider } from "../../components/Menu";
import * as componentHandler from "../../resources/material";

export default class ActionMenu extends PureComponent {
  componentDidMount() {
    componentHandler.upgradeDom();
  }

  render() {
    return (
      <Menu refId={ this.props.anchorEl }>
        <MenuItem caption="Neue Geschichte" icon="add_circle" />
        <MenuItem
          caption="Geschichte Öffnen"
          icon="folder_open"
          action={ this.props.openStoryDialog }
        />
        <Divider />
        <MenuItem
          caption="Speicherort Öffnen"
          disabled={ !this.props.storyOpen }
          icon="folder"
        />
        <MenuItem
          caption="Über Plotify"
          icon="info"
        />
      </Menu>
    );
  }
}

ActionMenu.propTypes = {
  openStoryDialog: PropTypes.func.isRequired,
  storyOpen:       PropTypes.bool.isRequired,
  anchorEl:        PropTypes.string.isRequired,
};
