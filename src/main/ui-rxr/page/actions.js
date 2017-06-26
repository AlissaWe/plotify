import { createMessageStreams, messageStreamsMonitor$ } from "rxr";
import isDev from "electron-is-dev";

const monitor$ = isDev ? messageStreamsMonitor$ : undefined;

const actionStreams = createMessageStreams([
  "setPage"
], { messageStreamsMonitor$: monitor$ });

export default actionStreams;