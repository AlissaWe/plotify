import React from "react";
import Popover from "material-ui/Popover";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import Divider from "material-ui/Divider";
import ActionInfo from "material-ui/svg-icons/action/info";
import FolderOpen from "material-ui/svg-icons/file/folder-open";
import FileFolder from "material-ui/svg-icons/file/folder";
import AvNewReleases from "material-ui/svg-icons/av/new-releases";
import actionStreams from "./reducers/stories/actions";
import { connectWithState } from "rxr-react";
import PropTypes from "react-proptypes";

// const mapStateToProps = (state) => {
//   return {
//     noStoryOpen: stories.selectors.isStoryOpen(state)
//   };
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onCreateStory: () => {
//       dispatch(stories.actions.createStory());
//     },
//     onOpenStory: () => {
//       dispatch(stories.actions.openStory());
//     },
//     onOpenStoryFileLocation: () => {
//       dispatch(stories.actions.openStoryFileLocation());
//     },
//     onOpenAboutDialog: () => {
//       dispatch(about.actions.showAboutDialog());
//     }
//   };
// };

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
    // this.props.onCreateStory();
  }

  handleOpenStory() {
    this.props.onRequestClose();
    this.props.openStoryDialog();
  }

  handleOpenStoryFileLocation() {
    // this.props.onRequestClose();
    // this.props.onOpenStoryFileLocation();
  }

  handleOpenAboutDialog() {
    // this.props.onRequestClose();
    // this.props.onOpenAboutDialog();
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
            disabled={!this.props.storyOpen}
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
};

const selector = (state) => ({
  storyOpen: state.story.open,
  openStoryDialog: actionStreams.openStoryDialog,
});

const ActionMenu = connectWithState(selector)(ActionMenuComponent);

export default ActionMenu;