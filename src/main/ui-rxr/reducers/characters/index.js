import { combineReducers } from "rxr";
import actionStreams from "./actions";
import { sendToModel } from "../../../shared/commons/ipc";
import * as channel from "../../../shared/characters/ipc-channels";
import Rx from "rxjs";

const IS_LOADING = "IS_LOADING";

const charactersDataLoadingReducer$ = actionStreams.charactersDataLoading$
  .map((ts) => state => ({
    ...state,
    characters: {
      ...state.characters,
      status: IS_LOADING,
      ts
    }
  }));

const setFilterReducer$ = actionStreams.setFilter$
  .map((val = "") => state => ({
    ...state,
    filter: val
  }));

const selectCharacterReducer$ = actionStreams.selectCharacter$
  .map((id = "") => state => ({
    ...state, selectedCharacter: id.toString()
  }));

const receivedCharactersData$ = actionStreams.receivedCharactersData$
  .map(({ data, error, ts }) => state => {
    if (error) {
      const err = typeof error === "object" ? error.message : error;
      return {
        ...state,
        characters: {
          ...state.characters,
          status: err,
          ts
        }
      };
    }
    if (Array.isArray(data)) {
      return {
        ...state,
        characters: {
          list: data,
          status: undefined,
          ts
        }
      };
    }
    return state;
  });

const fetchCharacters$ = actionStreams.fetchCharacters$
  .flatMap(() => {
    const ts = Date.now();
    // notify about loading
    actionStreams.charactersDataLoading$.next(ts);
    const params = { deleted: false, filter: "" };
    return Rx.Observable.fromPromise(sendToModel(channel.FIND_CHARACTERS, params));
  })
  .map(val => {
    const ts = Date.now();
    const error = (val instanceof Error) ? val.message : undefined;
    const data = error ? undefined : val;
    // update state
    actionStreams.receivedCharactersData$.next({ data, error, ts });
    return (state) => state;
  });

const reducer$ = combineReducers([
  charactersDataLoadingReducer$,
  setFilterReducer$,
  selectCharacterReducer$,
  receivedCharactersData$,
  fetchCharacters$
]);

export default reducer$;