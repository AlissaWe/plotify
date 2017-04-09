import React from "react";
import MenuItem from "material-ui/MenuItem";
import SocialPerson from "material-ui/svg-icons/social/person";
import ActionDelete from "material-ui/svg-icons/action/delete";
import {palette} from "../../themes/PlotifyMainTheme";
import Section from "../../constants/sections";

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

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.goToCharacters = this.goToCharacters.bind(this);
    this.goToTrash = this.goToTrash.bind(this);
  }

  goToCharacters() {
    this.props.onChangeSection(Section.CHARACTER);
  }

  goToTrash() {
    this.props.onChangeSection(Section.TRASH);
  }

  render() {
    const {currentSection} = this.props;
    return (
      <div style={styles.menu}>
        <MenuItem
          disabled={this.props.disabled}
          style={ currentSection === Section.CHARACTER ? styles.active : styles.menuItem }
          leftIcon={
            <SocialPerson
              color={ currentSection === Section.CHARACTER ? styles.iconActive.color : "" }
            />
          }
          onTouchTap={this.goToCharacters}/>
        <MenuItem
          disabled={this.props.disabled}
          style={ currentSection === Section.TRASH ? styles.trashActive : styles.trash }
          leftIcon={
            <ActionDelete
              color={ currentSection === Section.TRASH ? styles.iconActive.color : "" }
            />
          }
          onTouchTap={this.goToTrash}/>
      </div>
    );
  }
}

Navigation.propTypes = {
  onChangeSection: React.PropTypes.func.isRequired,
};