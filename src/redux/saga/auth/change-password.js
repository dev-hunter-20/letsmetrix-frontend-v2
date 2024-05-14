import { call, put } from 'redux-saga/effects';

import { changePasswordAction } from '../../../redux/actions';
import AuthApiService from './../../../api-services/api/auth/AuthApiService';

// FUNCTION

export function* changePasswordSaga(action) {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(AuthApiService.changePassword, materials);
    const changePasswordResponse = response;
    yield put(changePasswordAction.success(changePasswordResponse));
    successCallback?.(changePasswordResponse);
  } catch (err) {
    yield put(changePasswordAction.failure(err));
    failedCallback?.(err);
  }
}
