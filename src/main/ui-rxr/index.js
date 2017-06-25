import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import { Provider } from "rxr-react";
import { createLoggerStream, createState, messageStreamsMonitor$, startLogging } from "rxr";
import App from "./App";
import { getMuiTheme, MuiThemeProvider } from "material-ui/styles/index";
import PlotifyMainTheme from "./themes/PlotifyMainTheme";
import initialState from "./initialState";

import reducer$ from "./reducers";
injectTapEventPlugin();

// import chainedActionsMiddleware from "./chained-actions";

const state$ = createState(reducer$, initialState);

const loggerStream$ = createLoggerStream(state$, messageStreamsMonitor$);
startLogging(loggerStream$);

window.onload = () => {
  ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme(PlotifyMainTheme)}>
      <Provider state$={state$}>
        <App />
      </Provider>
    </MuiThemeProvider>,
    document.getElementById("root")
  )
  ;
};