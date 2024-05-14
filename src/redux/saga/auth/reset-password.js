import { call, put } from 'redux-saga/effects';

import { resetPasswordAction } from '../../../redux/actions';
import AuthApiService from './../../../api-services/api/auth/AuthApiService';

// FUNCTION

export function* resetPasswordSaga(action) {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(AuthApiService.resetPassword, materials);
    const resetPasswordResponse = response;
    yield put(resetPasswordAction.success(resetPasswordResponse));
    successCallback?.(resetPasswordResponse);
  } catch (err) {
    yield put(resetPasswordAction.failure(err));
    failedCallback?.(err);
  }
}
