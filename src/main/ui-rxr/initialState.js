const initialState = {
  title: "Plotify",
  story: {
    loading: false,
    loadingFailed: false,
    closing: false,
    closingFailed: false,
    creating: false,
    creationFailed: false,
    error: null,
    open: false,
    file: null
  },
  characters: {
    list: [],
    ts: 0,
    status: undefined
  },
  filter: "",
  selectedCharacter: "",
};

export default initialState;