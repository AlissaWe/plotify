import React, { PureComponent } from "react";
import CharacterProfile from "./CharacterProfile";
import FilterableCharacterList from "./CharacterList";
import { sendToModel } from "../../../shared/commons/ipc";
import { FIND_CHARACTERS } from "../../../shared/characters/ipc-channels";
import types from "../../../shared/characters/change-type";
import * as actions from "../actions";

export default class CharacterSection extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSelectCharacter = this.handleSelectCharacter.bind(this);
    this.handleNameChanged = this.handleNameChanged.bind(this);
    this.saveName = this.saveName.bind(this);
    this.state = {
      characters:          [],
      error:               "",
      selectedCharacterId: "",
    };
  }

  componentWillMount() {
    sendToModel(FIND_CHARACTERS, { deleted: false, filter: "" })
      .then((characters) => this.setState({ characters }))
      .catch((error) => this.setState({ error }));
  }

  handleSelectCharacter(id) {
    this.setState({ selectedCharacterId: id });
  }

  handleNameChanged(name) {
    const characters = [...this.state.characters];
    const index = characters
      .findIndex((c) => c.id === this.state.selectedCharacterId);
    characters[index].name = name;
    this.setState({ characters });
  }

  get characterName() {
    let result = undefined;
    const character = this.state.characters
      .find((c) => c.id === this.state.selectedCharacterId);
    if (character) {
      result = character.name;
    }
    return result;
  }

  get isCharacterSelected() {
    return this.state.selectedCharacterId !== "";
  }

  saveName(name) {
    if (name !== this.characterName) {
      const params = {
        characterId: this.state.selectedCharacterId,
        type:        types.CHARACTER,
        typeId:      this.state.selectedCharacterId,
        changes:     { name },
      };
      actions.updateCharacter(params, this.handleNameChanged(name));
    }
  }

  render() {
    return (
      <div>
        <div style={{ width: 300, float: "left" }}>
          <FilterableCharacterList
            items={ this.state.characters }
            selectItem={ this.handleSelectCharacter }
          />
        </div>
        <div style={{ width: "calc(100% - 320px)", float: "left" }}>
          {
            this.isCharacterSelected ?
              <CharacterProfile
                id={ this.state.selectedCharacterId }
                name={ this.characterName }
                saveName={ this.saveName }
              />
              :
              "no char selected"
          }
        </div>
      </div>
    );
  }
}