import { combineReducers } from "rxr";
import characters from "./characters";
import story from "./story";
import page from "./page";

const reducer$ = combineReducers([
  story.reducer,
  characters.reducer,
  page.reducer,
]);

export default reducer$;