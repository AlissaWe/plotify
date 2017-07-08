import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class CardTitle extends PureComponent {
  render() {
    return (
      <div className="mdl-card__title">
        <h2 className="mdl-card__title-text">
          { this.props.title }
        </h2>
      </div>
    );
  }
}

CardTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

CardTitle.defaultProps = {};
