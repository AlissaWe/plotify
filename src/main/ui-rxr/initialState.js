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
    },
    profile: {
      characterId: null,
      savedName: null,
      changedName: null,
      deleted: null,
      loading: false,
      loadingFailed: false,
      saving: false,
      savingFailed: false,
      error: null,
      groups: {},
      groupsOrder: [],
      entries: {}
    }
  },
};

export default initialState;