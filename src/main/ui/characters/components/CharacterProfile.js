import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Entry from "./Entry";
import { TextField } from "../../components/TextField";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import * as actions from "../actions";

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
    return this.state.groups.findIndex((group) => group.id === id);
  }

  getEntryIndexById(groupIndex, id) {
    return this.state.groups[groupIndex].entries
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
        const groups = [...this.state.groups];
        groups[groupIndex].entries[entryIndex].value = value;
        this.setState({ groups });
        console.log("Entry saved successfully", res);
      })
      .catch((e) => {
        console.log("Entry could not be saved", e);
        // TODO: rollback changes
      });
  }

  render() {
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="profile"
          transitionAppear
          transitionAppearTimeout={ 500 }
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 0 }
        >
          <TextField
            label="Name"
            value={ this.props.name }
            id={ this.props.id }
            onBlur={ this.props.saveName }
            fullWidth
          />
          {
            this.state.groups.map(
              (g) => (
                <div
                  className="mdl-card mdl-shadow--2dp"
                  key={ g.id }
                  style={{ width: "100%", marginBottom: 25 }}
                >
                  <div className="mdl-card__title">
                    <h2 className="mdl-card__title-text">
                      { g.title }
                    </h2>
                  </div>
                  <div className="mdl-card__supporting-text">
                    <form action="#">
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
                    </form>
                  </div>
                </div>
              ))
          }
        </ReactCSSTransitionGroup>
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
