import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Entry from "./Entry";
import { TextField } from "../../components/TextField";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import * as actions from "../actions";
import CharacterGroup from "./CharacterGroup";
import { Card, CardSupportingText } from "../../components/Card";

export default class CharacterProfile extends PureComponent {
  constructor(props) {
    super(props);
    this.getGroupIndexById = this.getGroupIndexById.bind(this);
    this.saveEntry = this.saveEntry.bind(this);
    this.setProfile = this.setProfile.bind(this);
    this.state = { groups: [] };
  }

  componentDidMount() {
    this.loadProfile(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    this.loadProfile(nextProps.id);
  }

  setProfile(groups) {
    this.setState({ groups });
  }

  getGroupIndexById(id) {
    return this.groups.findIndex((group) => group.id === id);
  }

  getEntryIndexById(groupIndex, id) {
    return this.groups[groupIndex].entries
      .findIndex((entry) => entry.id === id);
  }

  loadProfile(id) {
    actions.loadProfile(id)
      .then((groups) => this.setProfile(groups))
      .catch((e) => console.log("Could not load Profile", e));
  }

  saveEntry(id, value, characterId, groupId) {
    const groupIndex = this.getGroupIndexById(groupId);
    const entryIndex = this.getEntryIndexById(groupIndex, id);
    actions.updateProfileEntry(characterId, id, value)
      .then((res) => {
        const groups = [...this.groups];
        groups[groupIndex].entries[entryIndex].value = value;
        this.setState({ groups });
        console.log("Entry saved successfully", res);
      })
      .catch((e) => {
        console.log("Entry could not be saved", e);
        // TODO: rollback changes
      });
  }

  get groups() {
    return this.state.groups;
  }

  render() {
    return (
      <div className="plotify-character-profile">
        <Card className="plotify-character-profile--name-panel mdl-color--accent">
          <CardSupportingText>
            <TextField
              label="Name"
              value={ this.props.name }
              id={ this.props.id }
              onBlur={ this.props.saveName }
              fullWidth
            />
          </CardSupportingText>
        </Card>
        <div className="plotify-character-groups-list">
          {
            this.groups.map((g) => (
              <ReactCSSTransitionGroup
                transitionName="profile"
                transitionAppear
                transitionAppearTimeout={ 500 }
                transitionEnterTimeout={ 500 }
                transitionLeaveTimeout={ 0 }
              >
                <CharacterGroup
                  key={ g.id }
                  id={ g.id }
                  title={ g.title }
                >
                  { g.entries.map(({ id, title, value }) =>
                    (<Entry
                      id={ id }
                      key={ id }
                      title={ title }
                      value={ value }
                      saveValue={ this.saveEntry }
                      characterId={ this.props.id }
                      groupId={ g.id }
                      parent={ this }
                    />))}
                </CharacterGroup>
              </ReactCSSTransitionGroup>
            ))
          }
        </div>
      </div>
    );
  }
}

CharacterProfile.propTypes = {
  id:       PropTypes.string.isRequired,
  name:     PropTypes.string.isRequired,
  saveName: PropTypes.func.isRequired,
};

CharacterProfile.defaultProps = {};
