import React, { PureComponent, PropTypes } from "react";

const styles = {
  width: "100%",
};

export default class Search extends PureComponent {
  render() {
    const id = this.props.id;
    const fieldId = `search-input-${id}`;
    const labelId = `search-icon-${id}`;
    return (
      <form action="#" style={ styles }>
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
          <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor={ fieldId }>
            <i className="material-icons">search</i>
          </label>
          <div className="mdl-textfield__expandable-holder">
            <input className="mdl-textfield__input" type="text" id={ fieldId } />
            <label className="mdl-textfield__label" htmlFor={ labelId }>Expandable Input</label>
          </div>
        </div>
      </form>
    );
  }
}

Search.propTypes = {
  id: PropTypes.string.isRequired,
};
