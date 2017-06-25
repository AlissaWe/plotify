import React from "react";
import * as selectors from "../selectors";
import { PAGES } from "../constants";
import CharacterPage from "../../characters/components/CharacterPage";
import WelcomePage from "../../welcome/components/WelcomePage";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    currentPageId: selectors.getCurrentPageId(state),
    hasNavigation: selectors.hasCurrentPageNavigation(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

class PageContainerComponent extends React.Component {
  render() {
    let page;
    switch (this.props.currentPageId) {
      case
      PAGES.CHARACTERS.id :
        page = <CharacterPage />;
        break;
      default:
        page = <WelcomePage />;
        break;
    }
    return (
      <div>
      { page }
      </div>
    );
  }
}

const PageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContainerComponent);

export default PageContainer;
