import Rx from "rxjs";
import { combineReducers } from "rxr";
import actionStreams from "./actions";
import { sendToModel } from "../../../shared/commons/ipc";
import * as channel from "../../../shared/characters/ipc-channels";
import list from "../list";

const profileLoadingReducer$ = actionStreams.profileLoading$
  .map((ts) => state => ({
    ...state,
    profile: {
      ...state.profile,
      loading: true,
      ts
    }
  }));

const fetchProfileReducer$ = actionStreams.fetchProfile$
  .flatMap((id) => {
    return Rx.Observable.fromPromise(sendToModel(channel.GET_CHARACTER_PROFILE, id));
  })
  .map(val => {
    const ts = Date.now();
    const error = (val instanceof Error) ? val.message : undefined;
    const data = error ? undefined : val;
    actionStreams.receivedProfile$.next({ error, data, ts });
    return (state) => state;
  });


const receivedProfileReducer$ = actionStreams.receivedProfile$
  .map(({ error, data, ts }) => state => {
    if (error) {
      const err = typeof error === "object" ? error.message : error;
      return {
        ...state,
        characters: {
          ...state.characters,
          profile: {
            ...state.characters.profile,
            loading: false,
            loadingFailed: true,
            error: err,
            ts
          }
        }
      }
    }
    if (data) {
      const character = list.selectors.getSelectedCharacter(state);
      return {
        ...state,
        characters: {
          ...state.characters,
          profile: {
            ...state.characters.profile,
            characterId: character.id,
            savedName: character.name,
            changedName: character.name,
            deleted: character.deleted,
            loading: false,
            loadingFailed: false,
            error: null,
            groups: data.reduce(groupsToMap, {}),
            groupsOrder: data.map(group => group.id),
            entries: data.reduce(groupsEntriesToMap, {}),
            ts
          }
        }
      }
    }
    return state;
  });
  // .do(() => state => {
  //   return list.selectors.getSelectedCharacter(state);
  // })
  // .map(character => state => ({
  //   ...state,
  //   characters: {
  //     ...state.characters,
  //     profile: {
  //       ...state.characters.profile,
  //       characterId: character.id,
  //       savedName: character.name,
  //       changedName: character.name,
  //       deleted: character.deleted,
  //     }
  //   }
  // }));

function groupsToMap(groups, group) {
  groups[group.id] = {
    id: group.id,
    title: group.title,
    entriesOrder: group.entries.map(entry => entry.id)
  };
  return groups;
}

function groupsEntriesToMap(entries, group) {
  return group.entries.reduce(entriesToMap, entries);
}

function entriesToMap(entries, entry) {
  entries[entry.id] = {
    id: entry.id,
    title: entry.title,
    savedValue: entry.value,
    changedValue: entry.value,
    saving: false,
    savingFailed: false,
    error: null
  };
  return entries;
}

const reducer$ = combineReducers([
  profileLoadingReducer$,
  fetchProfileReducer$,
  receivedProfileReducer$
]);

export default reducer$;