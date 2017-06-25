import { combineReducers } from "rxr";
import actionStreams from "./actions";
import { sendToModel } from "../../../shared/commons/ipc";
import * as channel from "../../../shared/stories/ipc-channels";
import Rx from "rxjs";

const openStoryReducer$ = actionStreams.openStory$
  .flatMap((filePath = "") => {
    const ts = Date.now();
    actionStreams.storyLoading$.next(ts);
    return Rx.Observable.fromPromise(sendToModel(channel.OPEN_STORY, filePath));
  })
  .map(val => {
    const ts = Date.now;
    const error = (val instanceof Error) ? val.message : undefined;
    const data = error ? undefined : val;
    actionStreams.receivedStoryFilePath$.next({ data, error, ts });
    return (state) => state;
  });

const openStoryDialogReducer$ = actionStreams.openStoryDialog$
  .flatMap(() => {
    const ts = Date.now();
    // actionStreams.storyLoading$.next(ts);
    return Rx.Observable.fromPromise(sendToModel(channel.OPEN_STORY_DIALOG));
  })
  .map(file => {
    actionStreams.openStory$.next(file);
    return (state) => state;
  });

const storyLoadingReducer$ = actionStreams.storyLoading$
  .map((ts) => state => ({
    ...state,
    story: {
      ...state.story,
      loading: true,
      ts
    }
  }));

const storyClosingReducer$ = actionStreams.storyClosing$
  .map((ts) => state => ({
    ...state,
    story: {
      ...state.story,
      closing: true,
      ts
    }
  }));


const receivedStoryFilePathReducer$ = actionStreams.receivedStoryFilePath$
  .map(({ data, error, ts }) => state => {
    if (error) {
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
  });

const reducer$ = combineReducers([
  storyLoadingReducer$,
  storyClosingReducer$,
  openStoryReducer$,
  receivedStoryFilePathReducer$,
  openStoryDialogReducer$
]);

export default reducer$;