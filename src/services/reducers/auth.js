import {
    LOGIN,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGOUT,
    REFRESH_TOKEN,
    GET_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED
} from '../actions/auth';

const initialState =
    {
        login: false,
        user: {
            name:'',
            email:''
        }
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case REGISTER_SUCCESS: {
            const userObj = action.user;
            console.log(userObj)
            return {
                ...state
            };
        }
        case REGISTER_FAILED:{
            return {
                ...state
            };
        }

        case LOGIN: {
            console.log(action.user)
            return {
                ...state,
                login: true,
                user: {
                    name : action?.user?.name,
                    email: action?.user?.email
                }
            };
        }
        case LOGOUT: {
            return {
                ...state,
                login: false,
                user: {
                    name : '',
                    email: ''
                }
            };
        }

        case GET_USER:
        case UPDATE_USER_SUCCESS: {
            console.log(action);
            return {
                ...state,
                user: {
                    name : action?.user?.name,
                    email: action?.user?.email
                }
            };
        }

        case UPDATE_USER_FAILED: {
            console.log(action);
            return {
                ...state,
                UPDATE_USER_FAILED : true
            };
        }


        default: {
            return state;
        }
    }
}
