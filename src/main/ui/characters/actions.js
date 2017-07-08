import { sendToModel } from "../../shared/commons/ipc";
import {
  CREATE_CHARACTER, FIND_CHARACTERS, GET_CHARACTER_PROFILE,
  UPDATE_CHARACTER,
} from "../../shared/characters/ipc-channels";
import types from "../../shared/characters/change-type";

/*
 TODO: possible include the component's state / partial state in action functions.
 this would move a lot of state transformation from the components to actions.
 */

export function loadProfile(id) {
  return sendToModel(GET_CHARACTER_PROFILE, id);
}

function updateCharacter(params) {
  return sendToModel(UPDATE_CHARACTER, params);
}

export function updateCharacterName(characterId, name) {
  const params = {
    characterId,
    type:    types.CHARACTER,
    typeId:  characterId,
    changes: { name },
  };
  return updateCharacter(params);
}

export function updateProfileEntry(characterId, entryId, value) {
  const params = {
    characterId,
    type:    types.ENTRY,
    typeId:  entryId,
    changes: { value },
  };
  return updateCharacter(params);
}

export function findCharacters(filter) {
  const params = {
    deleted: false,
    filter,
  };
  return sendToModel(FIND_CHARACTERS, params);
}

export function createCharacter() {
  return sendToModel(CREATE_CHARACTER);
}
