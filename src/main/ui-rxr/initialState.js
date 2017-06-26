import { PAGES } from "./page/constants";

const initialState = {
  title: "Plotify",
  page: {
    id: PAGES.WELCOME.id,
    title: PAGES.WELCOME.title,
    navigation: PAGES.WELCOME.navigation
  },
  story: {
    loading: false,
    loadingFailed: false,
    closing: false,
    closingFailed: false,
    creating: false,
    creationFailed: false,
    error: null,
    open: false,
    file: null,
    ts: 0,
  },
  characters: {
    list: {
      loading: false,
      error: null,
      filter: "",
      characters: {},
      order: [],
      selected: null
    }
  },
};

export default initialState;