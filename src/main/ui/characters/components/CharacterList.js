import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import CharacterListItem from "./CharacterListItem";
import componentHandler from "../../resources/material";
import { List } from "../../components/List";

export default class CharacterList extends PureComponent {
  constructor(props) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
    this.state = {
      selected: 0,
    };
  }

  componentDidMount() {
    componentHandler.upgradeDom();
  }

  selectItem(id) {
    this.setState({
      selected: id,
    });
    this.props.onSelectItem(id);
  }

  render() {
    return (
      <div className="plotify-character-list">
        <List>
          {
            this.props.items.map(({ id, name, deleted }) => (
              <CharacterListItem
                key={ id }
                name={ name }
                deleted={ deleted }
                selected={ id === this.state.selected }
                handleSelect={ () => this.selectItem(id) }
              />
            ))
          }
        </List>
      </div>
    );
  }
}

CharacterList.propTypes = {
  items:        PropTypes.array.isRequired,
  onSelectItem: PropTypes.func.isRequired,
};

CharacterList.defaultProps = {
  items: [],
};
