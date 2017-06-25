import { combineReducers } from "rxr";
import charactersReducer from "./characters";
import storyReducer from "./stories";

const reducer$ = combineReducers([
  charactersReducer,
  storyReducer
]);

export default reducer$;