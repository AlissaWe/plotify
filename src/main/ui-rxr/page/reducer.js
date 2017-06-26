import { combineReducers } from "rxr";
import actionStreams from "./actions";
import characters from "../characters";
import { PAGES } from "./constants";

const setPageReducer$ = actionStreams.setPage$
  .map((id = "") => state => {
    const page = getPage(id);
    if (id === PAGES.CHARACTERS.id) {
      characters.actions.handleSetPage$.next();
    }
    return {
      ...state,
      page: {
        ...state.page,
        id: page.id,
        title: page.title,
        navigation: page.navigation
      }
    }
  });

const getPage = (id) => {
  for (let page in PAGES) {
    if (PAGES.hasOwnProperty(page)) {
      if (PAGES[page].id === id) {
        return PAGES[page];
      }
    }
  }
  throw new Error("Unknown page id: " + id);
};

const reducer$ = combineReducers([
  setPageReducer$
]);

export default reducer$;