export const getUsersUpdateState = (state, action) => ({
  ...state,
  getUsersResponse: action.payload.response,
});
