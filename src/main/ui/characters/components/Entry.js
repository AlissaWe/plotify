import React, { Component, PropTypes } from "react";
import { TextField } from "../../components/TextField";

export default class Entry extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.state = {
      value: this.props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange(value) {
    this.setState({ value });
  }

  handleBlur(value) {
    if (value !== this.props.value) {
      this.props.saveValue(
        this.props.id,
        value,
        this.props.characterId,
        this.props.groupId);
    }
  }

  render() {
    return (
      <TextField
        label={ this.props.title }
        id={ this.props.id }
        value={ this.state.value }
        onChange={ this.handleChange }
        onBlur={ this.handleBlur }
        fullWidth
      />
    );
  }
}

Entry.proptypes = {
  id:          PropTypes.string.isRequired,
  title:       PropTypes.string.isRequired,
  value:       PropTypes.string.isRequired,
  saveValue:   PropTypes.func.isRequired,
  characterId: PropTypes.string.isRequired,
  groupId:     PropTypes.string.isRequired,
};
