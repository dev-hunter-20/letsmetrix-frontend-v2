import { call, put } from 'redux-saga/effects';

import { registerAppAction } from '../../../redux/actions';
import AuthApiService from './../../../api-services/api/auth/AuthApiService';

// FUNCTION

export function* registerAppSaga(action) {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(AuthApiService.registerApp, materials);
    const registerAppResponse = response;
    yield put(registerAppAction.success(registerAppResponse));
    successCallback?.(registerAppResponse);
  } catch (err) {
    yield put(registerAppAction.failure(err));
    failedCallback?.(err);
  }
}
