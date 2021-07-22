import axios, { AxiosResponse } from "axios";
import { Dispatch } from "redux"
import { ActionType } from "../action-types"
import { Action } from "../actions"
import { User } from './../../models/UserAddress';

export const fetchUsers = () => async (dispatch: Dispatch<Action>) => {
    
        dispatch({
            type: ActionType.FETCHUSERS
        });

        // async api call
        const response = await axios.get('http://127.0.0.1:3000/users/');
        dispatch({
            type: ActionType.FETCHUSERSSUCCESS,
            payload: response.data
        });
}

export const deleteUser = (id: number) => async(dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.DELETEUSER
    });

    const response:AxiosResponse = await axios.delete(`http://127.0.0.1:3000/users/${id}`);
    
    if (response.status === 204) {
        dispatch({
            type: ActionType.DELETEUSERSUCCESS,
            payload: id
        });
    } else {
        dispatch({
            type: ActionType.DELETEUSERFAILURE
        }); 
    }
       
}

export const editUser = (id: number, user: User) => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.EDITUSER
    });

    const response = await axios.put(`http://127.0.0.1:3000/users/${id}`, user);

    if (response.status === 200) {
        dispatch({
            type: ActionType.EDITUSERSUCCESS,
            payload: user
        });
    } else {
        dispatch({
            type: ActionType.EDITUSERSFAILURE,
            payload: user
        });
    }    
}

export const fetchFilteredUsers = (criterias: string) => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.FETCHUSERS
    });

    const params = {criterias: criterias};

    const response = await axios.get(`http://127.0.0.1:3000/users/filtered`, {params});

    dispatch({
        type: ActionType.FETCHUSERSSUCCESS,
        payload: response.data
    });
}

/* export const fetchUsersSuccess = (userAddress: User[]) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.FETCHUSERSSUCCESS,
            payload: userAddress            
        })
    }
} */

/* export const EditUserSuccess = (userAddress: User[]) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.EDITUSERSUCCESS,
            payload: userAddress            
        })
    }
} */

/* export const DeleteUserSuccess = (userAddress: User[]) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.DELETEUSERSUCCESS,
            payload: userAddress            
        })
    }
}*/
