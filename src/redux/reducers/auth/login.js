export const loginUpdateState = (state, action) => ({
  ...state,
  loginResponse: action.payload.response,
});
