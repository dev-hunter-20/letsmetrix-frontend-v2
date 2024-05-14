import { call, put } from 'redux-saga/effects';

import { updateUserAction } from '../../../redux/actions';
import UserApiService from '../../../api-services/api/UserApiService';

// FUNCTION

export function* updateUserSaga(action) {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(UserApiService.updateUsers, materials);
    const updateUserResponse = response;
    yield put(updateUserAction.success(updateUserResponse));
    successCallback?.(updateUserResponse);
  } catch (err) {
    yield put(updateUserAction.failure(err));
    failedCallback?.(err);
  }
}
