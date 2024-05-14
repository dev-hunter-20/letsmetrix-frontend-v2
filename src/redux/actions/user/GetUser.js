import { createActionCreator } from 'deox';

// CONSTANTS

export const EGetUsersAction = {
  GET_USERS: 'GET_USERS',
  GET_USERS_REQUEST: 'GET_USERS_REQUEST',
  GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
  GET_USERS_FAILED: 'GET_USERS_FAILED',
};

// FUNCTION

export const getUsersAction = {
  request: createActionCreator(
    EGetUsersAction.GET_USERS_REQUEST,
    (resolve) => (materials, successCallback, failedCallback) =>
      resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(EGetUsersAction.GET_USERS_SUCCESS, (resolve) => (response) => resolve({ response })),
  failure: createActionCreator(EGetUsersAction.GET_USERS_FAILED, (resolve) => (error) => resolve({ error })),
};
