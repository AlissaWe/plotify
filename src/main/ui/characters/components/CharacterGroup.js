import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Card, CardTitle, CardSupportingText } from "../../components/Card";


export default class CharacterGroup extends PureComponent {
  render() {
    return (
      <Card key={ this.props.id } className="plotify-character-group">
        <CardTitle title={ this.props.title } />
        <CardSupportingText>
          { this.props.children }
        </CardSupportingText>
      </Card>
    );
  }
}

CharacterGroup.propTypes = {
  id:      PropTypes.string.isRequired,
  title:   PropTypes.string.isRequired,
  entries: PropTypes.array.isRequired,
};

CharacterGroup.defaultProps = {
  entries: [],
};
