import { createMessageStreams, messageStreamsMonitor$ } from "rxr";
import isDev from "electron-is-dev";

const monitor$ = isDev ? messageStreamsMonitor$ : undefined;

const actionStreams = createMessageStreams([
  "openStory",
  "openStoryDialog",
  "storyLoading",
  "storyClosing",
  "receivedStoryFilePath",
  "closeStory",
  "setPage"
], { messageStreamsMonitor$: monitor$ });

export default actionStreams;