import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import * as componentHandler from "../../resources/material";


export default class Drawer extends PureComponent {
  componentDidMount() {
    componentHandler.upgradeDom();
  }

  render() {
    return (
      <div className="mdl-layout__drawer">
        <span className="mdl-layout-title">Plotify</span>
        <nav className="mdl-navigation">
          { this.props.children }
        </nav>
      </div>
    );
  }
}

Drawer.propTypes = {
  title: PropTypes.string.isRequired,
}
