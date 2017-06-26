import React, { PropTypes } from "react";
import Popover from "material-ui/Popover";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import Divider from "material-ui/Divider";
import ActionInfo from "material-ui/svg-icons/action/info";
import FolderOpen from "material-ui/svg-icons/file/folder-open";
import FileFolder from "material-ui/svg-icons/file/folder";
import AvNewReleases from "material-ui/svg-icons/av/new-releases";
import { connectWithState } from "rxr-react";
// TODO switch to react-proptypes when autocomplete works
// import PropTypes from "react-proptypes";
import story from "../../story";

class ActionMenuComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreateStory = this.handleCreateStory.bind(this);
    this.handleOpenStory = this.handleOpenStory.bind(this);
    this.handleOpenStoryFileLocation = this.handleOpenStoryFileLocation.bind(this);
    this.handleOpenAboutDialog = this.handleOpenAboutDialog.bind(this);
  }

  handleCreateStory() {
    // this.props.onRequestClose();
    // this.props.createStory();
  }

  handleOpenStory() {
    this.props.onRequestClose();
    this.props.openStoryDialog();
  }

  handleOpenStoryFileLocation() {
    // this.props.onRequestClose();
    // this.props.oopenStoryFileLocation();
  }

  handleOpenAboutDialog() {
    // this.props.onRequestClose();
    // this.props.showAboutDialog();
  }

  render() {
    return (
      <Popover
        open={this.props.open}
        anchorEl={this.props.anchorEl}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        targetOrigin={{ horizontal: "left", vertical: "top" }}
        onRequestClose={this.props.onRequestClose}>
        <Menu>
          <MenuItem
            primaryText="Neue Geschichte"
            onTouchTap={this.handleCreateStory}
            leftIcon={<AvNewReleases/>}
          />
          <MenuItem
            primaryText="Geschichte öffnen"
            onTouchTap={this.handleOpenStory}
            leftIcon={<FolderOpen/>}
          />
          <Divider/>
          <MenuItem
            primaryText="Speicherort öffnen"
            onTouchTap={this.handleOpenStoryFileLocation}
            leftIcon={<FileFolder/>}
            disabled={!this.props.isStoryOpen}
          />
          <Divider/>
          <MenuItem
            primaryText="Über Plotify"
            onTouchTap={this.handleOpenAboutDialog}
            leftIcon={<ActionInfo/>}/>
        </Menu>
      </Popover>
    );
  }
}

ActionMenuComponent.propTypes = {
  openStoryDialog: PropTypes.func.isRequired,
  isStoryOpen: PropTypes.bool.isRequired,
};

const selector = (state) => ({
  isStoryOpen: story.selectors.isStoryOpen(state),
  // createStory: story.actions.createStory,
  // openStoryFileLocation: story.actions.openStoryFileLocation,
  // showAboutDialog: story.actions.showAboutDialog,
  openStoryDialog: story.actions.openStoryDialog,
});

const ActionMenu = connectWithState(selector)(ActionMenuComponent);

export default ActionMenu;