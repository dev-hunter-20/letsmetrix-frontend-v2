export const updateUserUpdateState = (state, action) => ({
  ...state,
  updateUserResponse: action.payload.response,
});
