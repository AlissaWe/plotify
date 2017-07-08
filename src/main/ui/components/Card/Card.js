import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default class Card extends PureComponent {
  render() {
    return (
      <div className={ classNames("mdl-card", `mdl-shadow--${this.props.height}dp`, this.props.className) }>
        { this.props.children }
      </div>
    );
  }
}

Card.propTypes = {
  height:    PropTypes.number,
  className: PropTypes.string,
};

Card.defaultProps = {
  height: 2,
};
