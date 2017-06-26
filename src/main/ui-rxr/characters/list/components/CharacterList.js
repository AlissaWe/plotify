import React, { PropTypes, Component } from "react";
import * as s from "../selectors";
import actions from "../actions";
import { List, ListItem } from "material-ui";
import CharacterListItem from "./CharacterListItem";
import { connectWithState } from "rxr-react";
// TODO switch to react-proptypes when autocomplete works
// import PropTypes from "react-proptypes";

const styles = {
  list: {
    height: "100%",
    overflowY: "auto",
  }
};

class CharacterListComponent extends Component {
  componentWillMount() {
    this.props.fetchCharacters();
  }

  render() {
    return (
      <List style={styles.list}>
        {
          this.props.characters.map((character) => {
            return (
              <CharacterListItem
                name={character.name}
                key={character.id}
                characterId={character.id}
              />
            );
          })
        }
        <ListItem disabled={true} style={{ height: 8 * 8}}/>
      </List>
    );
  }
}

CharacterListComponent.propTypes = {
  characters: PropTypes.array.isRequired,
  fetchCharacters: PropTypes.func.isRequired,
};

const selector = (state) => ({
  characters: s.getCharactersInOrder(state),
  isLoading: s.isLoading(state),
  isLoadingFailed: s.isLoadingFailed(state),
  loadingError: s.getLoadingError(state),
  isCharacterSelected: s.isCharacterSelected(state),
  fetchCharacters: actions.fetchCharacters,
});

const CharacterList = connectWithState(selector)(CharacterListComponent);

export default CharacterList;
