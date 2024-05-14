import { createActionCreator } from 'deox';

// CONSTANTS

export const EUpdateUserAction = {
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILED: 'UPDATE_USER_FAILED',
};

// FUNCTION

export const updateUserAction = {
  request: createActionCreator(
    EUpdateUserAction.UPDATE_USER_REQUEST,
    (resolve) => (materials, successCallback, failedCallback) =>
      resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(EUpdateUserAction.UPDATE_USER_SUCCESS, (resolve) => (response) => resolve({ response })),
  failure: createActionCreator(EUpdateUserAction.UPDATE_USER_FAILED, (resolve) => (error) => resolve({ error })),
};
