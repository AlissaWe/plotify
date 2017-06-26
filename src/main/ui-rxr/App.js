import React, { Component } from "react";
import PlotifyAppBar from "./page/components/AppBar";
import { palette, spacing } from "./themes/PlotifyMainTheme";
import PageContainer from "./page/components/PageContainer";
import Navigation from "./page/components/Navigation";

const styles = {
  app: {
    background: palette.accent2Color,
    height: "100%",
    width: "100%",
  },
  pageWrapper: {
    position: "fixed",
    overflow: "hidden",
    top: spacing.desktopKeylineIncrement,
    left: 0,
    right: 0,
    bottom: 0,
  },
  navigationWrapper: {
    width: spacing.desktopToolbarHeight,
    height: "100%",
    float: "left",
  },
  pageContentWrapper: {
    width: "calc(100% - " + spacing.desktopToolbarHeight + "px)",
    marginLeft: spacing.desktopToolbarHeight,
    height: "100%",
  },
};

export default class AppComponent extends Component {
  render() {
    return (
      <div id="PlotifyApp" style={styles.app}>
        <PlotifyAppBar/>
        <div style={styles.navigationWrapper}>
          <Navigation />
        </div>
        <div style={styles.pageWrapper}>
          <div style={styles.pageContentWrapper}>
            <PageContainer/>
          </div>
        </div>
      </div>
    );
  }
}
