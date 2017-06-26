import { combineReducers } from "rxr";
import list from "./list";
import profile from "./profile";

import page from "../page";
import actionStreams from "./actions";

const handleSetPageReducer$ = actionStreams.handleSetPage$
  .map(() => state => {
    const pageId = page.constants.PAGES.CHARACTERS.id;
    const currentPageId = page.selectors.getCurrentPageId(state);
    if (pageId === currentPageId) {
      list.actions.fetchCharacters$.next();
    }
    return state;
  });

const reducer$ = combineReducers([
  handleSetPageReducer$,
  list.reducer,
  profile.reducer,
]);

export default reducer$;