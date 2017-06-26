import React, { Component, PropTypes } from "react";
import page from "../";
import { PAGES } from "../constants";
import CharacterPage from "../../characters/components/CharacterPage";
// import WelcomePage from "../../welcome/components/WelcomePage";
import { connectWithState } from "rxr-react";
// TODO use react-proptypes
// import PropTypes from "react-proptypes";

class PageContainerComponent extends Component {

  render() {
    let page;
    switch (this.props.currentPageId) {
      case
      PAGES.CHARACTERS.id :
        page = <CharacterPage />;
        break;
      default:
        page = <div>welcome</div>;
        break;
    }
    return (
      <div>
        { page }
      </div>
    );
  }
}

PageContainerComponent.propTypes = {
  currentPageId: PropTypes.string.isRequired,
  hasNavigation: PropTypes.bool.isRequired,
};

const selector = (state) => ({
  currentPageId: page.selectors.getCurrentPageId(state),
  hasNavigation: page.selectors.hasCurrentPageNavigation(state),
});

const PageContainer = connectWithState(selector)(PageContainerComponent);

export default PageContainer;
