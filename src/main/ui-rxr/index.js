import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import { Provider } from "rxr-react";
import { createState, createLoggerStream, startLogging, messageStreamsMonitor$ } from "rxr";

// import chainedActionsMiddleware from "./chained-actions";

import App from "./App";
import { getMuiTheme, MuiThemeProvider } from "material-ui/styles/index";
import PlotifyMainTheme from "./themes/PlotifyMainTheme";


import reducer$ from "./reducers";

// Component-Based States?
const initialState = {
  title: "Plotify",
  characters: {
    list: [],
    ts: 0,
    status: undefined
  },
  filter: "",
  selectedCharacter: "",
};

const state$ = createState(reducer$, initialState);

const loggerStream$ = createLoggerStream(state$, messageStreamsMonitor$);
startLogging(loggerStream$);

window.onload = () => {
  ReactDOM.render(
    <Provider state$={state$}>
      <MuiThemeProvider muiTheme={getMuiTheme(PlotifyMainTheme)}>
        <App />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById("root")
  );
};
