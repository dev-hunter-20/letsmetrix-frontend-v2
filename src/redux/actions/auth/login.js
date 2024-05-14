import { createActionCreator } from 'deox';

// CONSTANTS

export const ELoginAction = {
  LOGIN: 'LOGIN',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
};

// FUNCTION

export const loginAction = {
  request: createActionCreator(
    ELoginAction.LOGIN_REQUEST,
    (resolve) => (materials, successCallback, failedCallback) =>
      resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(ELoginAction.LOGIN_SUCCESS, (resolve) => (response) => resolve({ response })),
  failure: createActionCreator(ELoginAction.LOGIN_FAILED, (resolve) => (error) => resolve({ error })),
};
