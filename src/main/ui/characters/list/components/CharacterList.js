import React, { Component } from "react";
import {
  getCharactersInOrder,
  getLoadingError,
  getSelectedCharacterId,
  isCharacterSelected,
  isLoading,
  isLoadingFailed
} from "../selectors";
import { selectCharacter } from "../actions";
import { connect } from "react-redux";
import { List, ListItem } from "material-ui";
import CharacterListItem from "./CharacterListItem";


const mapStateToProps = (state) => {
  return {
    characters: getCharactersInOrder(state),
    selectedCharacterId: getSelectedCharacterId(state),
    isLoading: isLoading(state),
    isLoadingFailed: isLoadingFailed(state),
    loadingError: getLoadingError(state),
    isCharacterSelected: isCharacterSelected(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectItem: (id) => dispatch(selectCharacter(id)),
  };
};

const styles = {
  list: {
    height: "100%",
    overflowY: "auto",
  }
};

class CharacterListComponent extends Component {
  render() {
    return (
      <List style={styles.list} className="scrollable">
        {
          this.props.characters.map((character) => {
            return (
              <CharacterListItem
                name={character.name}
                key={character.id}
                isSelected={this.props.selectedCharacterId === character.id}
                onSelectItem={() => this.props.onSelectItem(character.id)}
              />
            );
          })
        }
        <ListItem disabled={true} style={{ height: 8 * 8}}/>
      </List>
    );
  }
}

const CharacterList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterListComponent);

export default CharacterList;