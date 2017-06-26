import React, { Component, PropTypes } from "react";
import AppBar from "material-ui/AppBar";
import { palette } from "../../themes/PlotifyMainTheme";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import ContentRedo from "material-ui/svg-icons/content/redo";
import ContentUndo from "material-ui/svg-icons/content/undo";
import ActionMenu from "./ActionMenu";
import { white } from "material-ui/styles/colors";
import { connectWithState } from "rxr-react";
import page from "../";
// TODO use react-proptypes
// import PropTypes from "react-proptypes";

const styles = {
  appBar: {
    color: white,
    toolbar: {
      background: palette.primary1Color,
      color: white,
      marginRight: 0,
      paddingRight: 0
    }
  },
};

class PlotifyAppBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.toggleActionMenu = this.toggleActionMenu.bind(this);
    this.closeActionMenu = this.closeActionMenu.bind(this);
  }

  closeActionMenu() {
    this.setState({
      open: false
    });
  }

  toggleActionMenu(event) {
    event.preventDefault();
    this.setState({
      open: !this.state.open,
      anchorEl: event.currentTarget
    });
  }

  render() {
    return (
      <AppBar
        title={this.props.title}
        style={styles.appBar}
        onLeftIconButtonTouchTap={this.toggleActionMenu}>
        <ActionMenu
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onRequestClose={this.closeActionMenu}/>
        <Toolbar style={styles.appBar.toolbar}>
          <ToolbarGroup>
            <IconButton tooltip="Rückgängig">
              <ContentUndo color="white"/>
            </IconButton>
            <IconButton tooltip="Wiederherstellen">
              <ContentRedo color="white"/>
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
      </AppBar>
    );
  }
}

AppBar.propTypes = {
  title: PropTypes.string.isRequired,
};

const selector = (state) => ({
  title: page.selectors.getCurrentPageTitle(state)
});

const PlotifyAppBar = connectWithState(selector)(PlotifyAppBarComponent);

export default PlotifyAppBar;