import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class NavigationLink extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.onClick();
  }

  render() {
    return (
      <a className="mdl-navigation__link" onClick={ this.handleClick }>
        { this.props.caption }
      </a>
    );
  }
}

NavigationLink.propTypes = {
  caption: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

NavigationLink.defaultProps = {};
