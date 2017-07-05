import { sendToModel } from "../../shared/commons/ipc";
import { FIND_CHARACTERS, GET_CHARACTER_PROFILE, UPDATE_CHARACTER } from "../../shared/characters/ipc-channels";
import types from "../../shared/characters/change-type";

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
