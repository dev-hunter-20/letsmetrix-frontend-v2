import { call, put } from 'redux-saga/effects';

import { loginAction } from '../../../redux/actions';
import Helpers from '../../../api-services/auth-helpers';
import AuthApiService from './../../../api-services/api/auth/AuthApiService';

// FUNCTION

export function* loginSaga(action) {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(AuthApiService.login, materials);
    const loginResponse = response;

    Helpers.storeAccessToken(response?.data?.token || '');
    Helpers.storeRefreshToken(response?.data?.refresh_token || '');

    yield put(loginAction.success(loginResponse));
    successCallback?.(loginResponse);
  } catch (err) {
    yield put(loginAction.failure(err));
    failedCallback?.(err);
  }
}
