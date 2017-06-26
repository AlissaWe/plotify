import React, { Component, PropTypes } from "react";
import * as s from "../selectors";
import StatusTextField from "./StatusTextField";
import { connectWithState } from "rxr-react";
// TODO switch to react-proptypes when autocomplete works
// import PropTypes from "react-proptypes";

const styles = {
  floatingLabelFocusStyle: {
    zIndex: 0,
  },
  floatingLabelStyle: {
    zIndex: 0,
  },
  underlineFocusStyle: {}
};

class ProfileGroupEntryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconVisible: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.onIconHideRequest = this.onIconHideRequest.bind(this);
  }

  onIconHideRequest() {
    this.setState({
      iconVisible: false,
    });
  }

  getValue() {
    return this.props.value(this.props.id);
  }

  getSavingError() {
    return this.props.savingError(this.props.id);
  }

  handleChange(event) {
    //this.props.setEntryValue(this.props.id, event.target.value);
  }

  handleBlur(value) {
    Promise.resolve()
      .then(() => this.props.setEntryValue(this.props.id, value))
      .then(() => {
        if (this.props.hasValueChanged(this.props.id)) {
          this.setState({
            iconVisible: true,
          });
        }
      })
      .then(() => this.props.saveEntryValue(this.props.id));
  }

  render() {
    return(
      <StatusTextField
        floatingLabelText={this.props.title}
        value={this.getValue()}
        fullWidth={true}
        floatingLabelStyle={styles.floatingLabelStyle}
        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        multiLine={true}
        errorText={typeof this.getSavingError() === Object ? "" : this.getSavingError()}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        isLoading={this.props.isSaving(this.props.id)}
        isSuccessFul={
          !this.props.isSaving(this.props.id) &&
          !this.props.isSavingFailed(this.props.id)
        }
        isError={!this.props.isSaving(this.props.id) && this.props.isSavingFailed(this.props.id)}
        iconVisible={this.state.iconVisible}
        iconHideRequest={this.onIconHideRequest}
      />
    );
  }
}


ProfileGroupEntryComponent.propTypes = {
  id: PropTypes.string.isRequired,
};

const selector = (state) => ({
  value: (id) => s.getEntryValue(state, id),
  hasValueChanged: (id) => s.hasEntryValueChanged(state, id),
  isSaving: (id) => s.isEntrySaving(state, id),
  isSavingFailed: (id) => s.isEntrySavingFailed(state, id),
  savingError: (id) => s.getEntrySavingError(state, id),
});

const ProfileGroupEntry = connectWithState(selector)(ProfileGroupEntryComponent);

export default ProfileGroupEntry;
