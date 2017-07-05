import React, { PureComponent, PropTypes } from "react";

export default class Drawer extends PureComponent {
  render() {
    return (
      <div className="mdl-layout__drawer">
        <span className="mdl-layout-title">Plotify</span>
        <nav className="mdl-navigation">
          <a className="mdl-navigation__link" href="">Link</a>
        </nav>
      </div>
    );
  }
}
