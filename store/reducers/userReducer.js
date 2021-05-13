import * as types from '../constants/ActionTypes';

const initState = null;

const userReducer = (state = initState, action) => {
    switch(action.type){
        case types.LOGIN: {
            state = action.user;

            return state;
        }
        case types.LOGOUT: {
            state = null;

            return state;
        }
        default: {
            return state;
        }
    }
}

export default userReducer;