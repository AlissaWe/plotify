import React, { Component, PropTypes } from "react";
import componentHandler from "../../resources/material";

export default class List extends Component {
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
      <div className="mdl-list">
        { this.props.children }
      </div>
    );
  }
}

List.propTypes = {
  children:      PropTypes.node,
};
