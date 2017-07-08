import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import CharacterList from "./CharacterList";
import Filter from "./Filter";

export default class FilterableCharacterList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Filter
          id="filterCharacterList"
          onChange={ this.props.onFilterChanged }
        />
        <CharacterList
          items={ this.props.items }
          selectItem={ this.props.selectItem }
        />
      </div>
    );
  }
}

FilterableCharacterList.propTypes = {
  items:           PropTypes.array.isRequired,
  selectItem:      PropTypes.func.isRequired,
  onFilterChanged: PropTypes.func.isRequired,
};

FilterableCharacterList.defaultProps = {
  items: [],
};
