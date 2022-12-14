const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoggedIn: true,
      };
    case "FETCH_USER":
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case "SET_IS_LOADING":
      return {
        isLoading: action.payload,
      };
    case "REMOVE_TOKEN":
      return {
        token: null,
      };
    case "SET":
      return {
        token: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
