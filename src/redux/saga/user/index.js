import { all, takeLatest } from 'redux-saga/effects';

import { getUsersAction, updateUserAction } from '../../../redux/actions';
import { getUsersSaga } from './GetUsers';
import { updateUserSaga } from './UpdateUser';

export default function* root() {
  yield all([
    takeLatest(getUsersAction.request.type, getUsersSaga),
    takeLatest(updateUserAction.request.type, updateUserSaga),
  ]);
}
