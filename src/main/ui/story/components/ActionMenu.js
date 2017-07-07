import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem, Divider } from "../../components/Menu";

export default class ActionMenu extends PureComponent {
  render() {
    return (
      <Menu refId="demo-menu-lower-right">
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
  storyOpen: PropTypes.bool.isRequired,
};
