import { createReducer } from 'deox';
import { getUsersAction, updateUserAction } from '../../actions';
import { getUsersUpdateState } from './GetUser';
import { updateUserUpdateState } from './UpdateUser';

const initialState = {
  getUsersResponse: undefined,
  updateUserResponse: undefined,
};

const UserReducer = createReducer(initialState, (handleAction) => [
  handleAction(getUsersAction.success, getUsersUpdateState),
  handleAction(updateUserAction.success, updateUserUpdateState),
]);

export default UserReducer;
