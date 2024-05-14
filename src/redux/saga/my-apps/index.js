import { all, takeLatest } from 'redux-saga/effects';

import { getMyAppsAction } from '../../../redux/actions';
import { getMyAppsSaga } from './MyApps';

export default function* root() {
  yield all([takeLatest(getMyAppsAction.request.type, getMyAppsSaga)]);
}
