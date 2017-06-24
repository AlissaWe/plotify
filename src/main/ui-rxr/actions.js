import { createMessageStreams, messageStreamsMonitor$ } from "rxr";
import isDev from "electron-is-dev";

const monitor$ = isDev ? messageStreamsMonitor$ : undefined;

const actionStreams = createMessageStreams([
  "setFilter",
  "fetchCharacters",
  "selectCharacter",
  "receivedCharactersData",
  "charactersDataLoading"
], { messageStreamsMonitor$: monitor$});

export default actionStreams;