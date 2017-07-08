import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import CharacterProfile from "./CharacterProfile";
import FilterableCharacterList from "./FilterableCharacterList";
import * as actions from "../actions";
import FloatingActionButton from "../../components/Buttons/FloatingActionButton";

export default class CharacterSection extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSelectCharacter = this.handleSelectCharacter.bind(this);
    this.handleNameChanged = this.handleNameChanged.bind(this);
    this.handleFilterChanged = this.handleFilterChanged.bind(this);
    this.saveName = this.saveName.bind(this);
    this.state = {
      characters:          [],
      error:               "",
      selectedCharacterId: "",
    };
  }

  componentWillMount() {
    this.findCharacters();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.story !== nextProps.story) {
      this.findCharacters();
    }
  }

  findCharacters(filter) {
    actions.findCharacters(filter)
      .then((characters) => this.setState({ characters }))
      .catch((error) => this.setState({ error }));
  }

  handleFilterChanged(filter) {
    this.findCharacters(filter);
  }

  handleSelectCharacter(id) {
    this.setState({ selectedCharacterId: id });
  }

  handleNameChanged(id, name) {
    const characters = [...this.state.characters];
    const index = characters
      .findIndex((c) => c.id === id);
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

  get isCharacterVisible() {
    return this.isCharacterSelected && typeof this.characterName !== "undefined";
  }

  saveName(name) {
    if (name !== this.characterName) {
      //actions.updateCharacter(params, this.handleNameChanged(name));
      actions.updateCharacterName(this.state.selectedCharacterId, name)
        .then((id) => this.handleNameChanged(id, name))
        .catch((e) => {
          console.log(e);
          // rollback changes...
        });
    }
  }

  render() {
    return (
      <div>
        <div style={{ width: 300, float: "left" }}>
          <FilterableCharacterList
            onFilterChanged={ this.handleFilterChanged }
            items={ this.state.characters }
            onSelectItem={ this.handleSelectCharacter }
          />

          <FloatingActionButton
            action={
              () => actions.createCharacter()
                .then((id) => {
                  console.log("character created", id);
                  this.findCharacters();
                })
            }
            icon="add"
          />
        </div>
        <div style={{ width: "calc(100% - 320px)", float: "left" }}>
          {
            this.isCharacterSelected && this.isCharacterVisible ?
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

CharacterSection.propTypes = {
  story: PropTypes.string.isRequired,
};
