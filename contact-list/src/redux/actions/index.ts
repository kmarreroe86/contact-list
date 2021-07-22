import { ActionType } from '../action-types';
import { User } from './../../models/UserAddress';

interface FetchUsers {
    type: ActionType.FETCHUSERS
}

interface EditUser {
    type: ActionType.EDITUSER
}

interface DeleteUser {
    type: ActionType.DELETEUSER
}

interface FetchUsersSuccess {
    type: ActionType.FETCHUSERSSUCCESS,
    payload: User[]
}

interface EditUserSuccess {
    type: ActionType.EDITUSERSUCCESS,
    payload: User
}

interface EditUserFailure {
    type: ActionType.EDITUSERSFAILURE    
}

interface DeleteUserSuccess {
    type: ActionType.DELETEUSERSUCCESS,
    payload: number
}

interface DeleteUserFailure {
    type: ActionType.DELETEUSERFAILURE
}

export type Action = FetchUsers | EditUser | DeleteUser | FetchUsersSuccess | EditUserSuccess | DeleteUserSuccess | DeleteUserFailure | EditUserFailure