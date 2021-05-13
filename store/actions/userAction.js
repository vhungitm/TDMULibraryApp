import * as types from '../constants/ActionTypes';

export const login = (user) => {
    return {
        type: types.LOGIN,
        user
    }
}

export const logout = () => {
    return {
        type: types.LOGOUT
    }
}