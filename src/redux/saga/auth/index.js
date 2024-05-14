import { all, takeLatest } from 'redux-saga/effects';

import {
  changePasswordAction,
  googleLoginAction,
  loginAppAction,
  loginAction,
  registerAppAction,
  resetPasswordAction,
} from '../../../redux/actions';

import { changePasswordSaga } from './change-password';
import { googleLoginSaga } from './google-login';
import { loginAppSaga } from './login-app';
import { loginSaga } from './login';
import { registerAppSaga } from './register-app';
import { resetPasswordSaga } from './reset-password';

export default function* root() {
  yield all([
    takeLatest(changePasswordAction.request.type, changePasswordSaga),
    takeLatest(googleLoginAction.request.type, googleLoginSaga),
    takeLatest(loginAppAction.request.type, loginAppSaga),
    takeLatest(loginAction.request.type, loginSaga),
    takeLatest(registerAppAction.request.type, registerAppSaga),
    takeLatest(resetPasswordAction.request.type, resetPasswordSaga),
  ]);
}
