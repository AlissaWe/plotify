import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import CharacterList from "./CharacterList";
import Filter from "../../components/Filter";

export default class FilterableCharacterList extends PureComponent {
  render() {
    return (
      <div className="plotify-character-list">
        <Filter
          id="filterCharacterList"
          onChange={ this.props.onFilterChanged }
        />
        <CharacterList
          items={ this.props.items }
          onSelectItem={ this.props.onSelectItem }
        />
      </div>
    );
  }
}

FilterableCharacterList.propTypes = {
  items:           PropTypes.array.isRequired,
  onSelectItem:    PropTypes.func.isRequired,
  onFilterChanged: PropTypes.func.isRequired,
};

FilterableCharacterList.defaultProps = {
  items: [],
};
