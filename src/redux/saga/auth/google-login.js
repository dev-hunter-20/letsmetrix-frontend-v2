import { call, put } from 'redux-saga/effects';

import { googleLoginAction } from '../../../redux/actions';
import AuthApiService from '../../../api-services/api/auth/AuthApiService';

// FUNCTION

export function* googleLoginSaga(action) {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(AuthApiService.googleLogin, materials);
    const googleLoginResponse = response;
    yield put(googleLoginAction.success(googleLoginResponse));
    successCallback?.(googleLoginResponse);
  } catch (err) {
    yield put(googleLoginAction.failure(err));
    failedCallback?.(err);
  }
}
