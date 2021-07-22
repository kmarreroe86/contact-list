import { ActionType } from "../action-types";
import { Action } from "../actions";
import { User } from './../../models/UserAddress';

interface DefaultState {
    loading: boolean,
    users: User[]
}
const initialState: DefaultState = {
    loading: false,
    users: []
};

const userReducer = (state: DefaultState = initialState, action: Action): DefaultState => {
    switch (action.type) {
        case ActionType.FETCHUSERS:
        case ActionType.EDITUSER:
        case ActionType.DELETEUSER:
            console.log('fetch user');
            return { ...state, loading: true };
        case ActionType.FETCHUSERSSUCCESS:
            return { ...state, loading: false, users: action.payload };
        case ActionType.DELETEUSERSUCCESS:
            return { ...state, loading: false, users: state.users.filter(u => u.id !== action.payload) };
        case ActionType.DELETEUSERFAILURE:
        case ActionType.EDITUSERSFAILURE:
            return { ...state, loading: false };
        case ActionType.EDITUSERSUCCESS:
            const usersTmp = [...state.users];
            const index = usersTmp.findIndex(u => u.id === action.payload.id);
            if (index > -1) {
                usersTmp.splice(index, 1, action.payload);
                return { ...state, loading: false, users: usersTmp };
            } else {
                return { ...state, loading: false };
            }
            
        default:
            return state;
    }
};

export default userReducer;