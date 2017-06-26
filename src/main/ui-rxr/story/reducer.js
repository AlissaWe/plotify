import { combineReducers } from "rxr";
import actionStreams from "./actions";
import page from "../page";
import { sendToModel } from "../../shared/commons/ipc";
import * as channel from "../../shared/stories/ipc-channels";
import Rx from "rxjs";
import { PAGES } from "../page/constants";

// helper
const createResult = (val) => {
  const ts = Date.now();
  const error = (val instanceof Error) ? val.message : undefined;
  const data = error ? undefined : val;
  return { error, data, ts };
};

const storyLoadingReducer$ = actionStreams.storyLoading$
  .map((ts) => state => ({
    ...state,
    story: {
      ...state.story,
      loading: true,
      ts
    }
  }));

const openStoryDialogReducer$ = actionStreams.openStoryDialog$
  .flatMap(() => {
    // const ts = Date.now();
    // actionStreams.storyLoading$.next(ts);
    return Rx.Observable.fromPromise(sendToModel(channel.OPEN_STORY_DIALOG));
  })
  .map(val => {
    const { error, data } = createResult(val);
    if (data) {
      actionStreams.openStory$.next(data);
    }
    if (error) {
      console.log("Es wurde keine Geschichte ausgewählt:", error)
    }
    return (state) => state;
  });

const openStoryReducer$ = actionStreams.openStory$
  .flatMap((filePath = "") => {
    const ts = Date.now();
    actionStreams.storyLoading$.next(ts);
    return Rx.Observable.fromPromise(sendToModel(channel.OPEN_STORY, filePath));
  })
  .map(val => {
    actionStreams.receivedStoryFilePath$.next(createResult(val));
    return (state) => state;
  });

const receivedStoryFilePathReducer$ = actionStreams.receivedStoryFilePath$
  .map(({ data, error, ts }) => state => {
    if (error) {
      // openStoryFailed
      const err = typeof error === "object" ? error.message : error;
      return {
        ...state,
        story: {
          ...state.story,
          loading: false,
          loadingFailed: true,
          error: err,
          ts
        }
      };
    }
    // openStorySuccessful
    if (typeof data === "string") {
      return {
        ...state,
        story: {
          ...state.story,
          loading: false,
          loadingFailed: false,
          error: null,
          open: true,
          file: data,
          ts
        }
      }
    }
    return state;
  })
  .map(() => {
    // todo optimize
    page.actions.setPage$.next(PAGES.CHARACTERS.id);
    return (state) => state;
  });

const storyClosingReducer$ = actionStreams.storyClosing$
  .map((ts) => state => ({
    ...state,
    story: {
      ...state.story,
      closing: true,
      ts
    }
  }));

// todo separate
const closeStoryReducer$ = actionStreams.closeStory$
  .flatMap(() => {
    // todo only close if a story is open
    const ts = Date.now();
    actionStreams.storyClosing$.next(ts);
    return Rx.Observable.fromPromise(sendToModel(channel.CLOSE_STORY));
  })
  .map(val => state => {
    const { error, data, ts } = createResult(val);
    console.log(">>> actionStreams.closeStory$ data", data);
    // closeStoryFailed
    if (error) {
      return {
        ...state,
        story: {
          ...state.story,
          closing: false,
          closingFailed: true,
          ts
        }
      }
    }
    // closeStorySuccessful
    if (typeof data === "undefined") {
      return {
        ...state,
        story: {
          ...state.story,
          closing: false,
          open: false,
          file: null,
          ts
        }
      }
    }
    return state;
  });

const reducer$ = combineReducers([
  storyLoadingReducer$,
  storyClosingReducer$,
  openStoryReducer$,
  receivedStoryFilePathReducer$,
  openStoryDialogReducer$,
  closeStoryReducer$,
]);

export default reducer$;