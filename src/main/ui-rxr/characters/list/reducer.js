import { combineReducers } from "rxr";
import actionStreams from "./actions";
import * as selectors from "./selectors";
import { sendToModel } from "../../../shared/commons/ipc";
import * as channel from "../../../shared/characters/ipc-channels";
import Rx from "rxjs";
import profile from "../profile";

const charactersDataLoadingReducer$ = actionStreams.charactersDataLoading$
  .map((ts) => state => ({
    ...state,
    characters: {
      ...state.characters,
      list: {
        ...state.characters.list,
        loading: true,
        ts
      }
    }
  }));

const setFilterReducer$ = actionStreams.setFilter$
  .map((val = "") => state => ({
    ...state,
    characters: {
      ...state.characters,
      list: {
        ...state.characters.list,
        filter: val
      }
    }
  }));

const selectCharacterReducer$ = actionStreams.selectCharacter$
  .map((id = "") => state => {
    profile.actions.fetchProfile$.next(id);
    return {
      ...state,
      characters: {
        ...state.characters,
        list: {
          ...state.characters.list,
          selected: id.toString()
        }
      }
    }
  });

const receivedCharactersData$ = actionStreams.receivedCharactersData$
  .map(({ data, error, ts }) => state => {
    if (error) {
      const err = typeof error === "object" ? error.message : error;
      return {
        ...state,
        characters: {
          ...state.characters,
          list: {
            ...state.characters.list,
            error: err,
            loading: false
          }
        }
      };
    }
    if (typeof data === "object") {
      return {
        ...state,
        characters: {
          ...state.characters,
          list: {
            ...state.characters.list,
            characters: data.reduce(charactersToMap, {}),
            loading: false,
            order: data.map(c => c.id)
          }
        }
      };
    }
    return state;
  });


function charactersToMap(characters, character) {
  characters[character.id] = character;
  return characters;
}

const fetchCharacters$ = actionStreams.fetchCharacters$
  .do(() => state => {
    return selectors.getListFilter(state);
  })
  .flatMap((filter) => {
    const ts = Date.now();
    // notify about loading
    actionStreams.charactersDataLoading$.next(ts);
    const params = { deleted: false, filter };
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