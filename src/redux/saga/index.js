import { all, fork } from "redux-saga/effects";

import authSaga from "./auth";
import userSaga from "./user";
import getMyAppsSaga from "./my-apps";

const rootSaga = function* root() {
  yield all([fork(authSaga), fork(userSaga), fork(getMyAppsSaga)]);
};

export default rootSaga;
