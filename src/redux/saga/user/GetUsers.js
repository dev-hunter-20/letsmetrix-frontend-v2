import { call, put } from 'redux-saga/effects';

import { getUsersAction } from '../../../redux/actions';
import UserApiService from '../../../api-services/api/UserApiService';

// FUNCTION

export function* getUsersSaga(action) {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(UserApiService.getUsers, materials);
    const getUsersResponse = response;
    yield put(getUsersAction.success(getUsersResponse));
    successCallback?.(getUsersResponse);
  } catch (err) {
    yield put(getUsersAction.failure(err));
    failedCallback?.(err);
  }
}
