import React, { PureComponent, PropTypes} from "react";

export default class AppBar extends PureComponent {
  render() {
    return (
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">
            { this.props.title }
          </span>
          <div className="mdl-layout-spacer" />
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link" href="">Link...</a>
          </nav>
        </div>
      </header>
    );
  }
}

AppBar.proptypes = {
  title: PropTypes.string.isRequired,
};
