import React, { Component, PropTypes } from "react";
import CharacterListItem from "./CharacterListItem";
import componentHandler from "../../resources/material";
import { List } from "../../components/List";

export default class CharacterList extends Component {
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
    this.props.selectItem(id);
  }

  render() {
    return (
      <div>
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
  items:      PropTypes.array.isRequired,
  selectItem: PropTypes.func.isRequired,
};

CharacterList.defaultProps = {
  items: [],
};
