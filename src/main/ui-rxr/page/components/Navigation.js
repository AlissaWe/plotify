import React, { Component, PropTypes } from "react";
import { palette } from "../../themes/PlotifyMainTheme";
import SocialPerson from "material-ui/svg-icons/social/person";
import { PAGES } from "../constants";
import * as s from "../selectors";
import actions from "../actions";
import MenuItem from "material-ui/MenuItem";
import { connectWithState } from "rxr-react";
// TODO use react-proptypes
// import PropTypes from "react-proptypes";

const styles = {
  menu: {
    position: "relative",
    height: "100%"
  },
  iconActive: {
    color: palette.alternateTextColor
  },
  menuItem: {},
  active: {
    backgroundColor: palette.primary2Color,
  },
  trash: {
    position: "absolute",
    bottom: 0,
  },
  trashActive: {
    position: "absolute",
    bottom: 0,
    backgroundColor: palette.primary2Color,
    color: palette.alternateTextColor,
  }
};


class NavigationComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { currentPageId } = this.props;
    const isCharActive = currentPageId === PAGES.CHARACTERS.id;

    return (
      <div style={styles.menu}>
        {
          this.props.hasNavigation &&
          <MenuItem
            disabled={ this.props.disabled }
            style={ isCharActive ? styles.active : styles.menuItem }
            leftIcon=
              {
                <SocialPerson
                  color={ isCharActive ? styles.iconActive.color : "" }
                />
              }
            onTouchTap={() => this.props.handleSetPage(PAGES.CHARACTERS.id)}/>
        }
      </div>
    );
  }
}

NavigationComponent.propTypes = {
  currentPageId: PropTypes.string.isRequired,
  hasNavigation: PropTypes.bool.isRequired,
  handleSetPage: PropTypes.func.isRequired
};

const selector = (state) => ({
  currentPageId: s.getCurrentPageId(state),
  hasNavigation: s.hasCurrentPageNavigation(state),
  handleSetPage: actions.setPage,
});

const Navigation = connectWithState(selector)(NavigationComponent);

export default Navigation;
