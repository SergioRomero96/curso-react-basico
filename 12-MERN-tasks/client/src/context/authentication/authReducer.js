import { GET_USER, LOGIN_ERROR, LOGOUT, REGISTRATION_ERROR, SUCCESSFUL_LOGIN, SUCCESSFUL_REGISTRATION } from "../../types";

export default (state, action) => {
    switch (action.type) {
        case SUCCESSFUL_LOGIN:
        case SUCCESSFUL_REGISTRATION:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticated: true,
                message: null,
                loading: false,
            }
        case GET_USER:
            return {
                ...state,
                authenticated: true,
                user: action.payload,
                loading: false,
            }
        case LOGOUT:
        case LOGIN_ERROR:
        case REGISTRATION_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                authenticated: null,
                message: action.payload,
                loading: false
            }
        default:
            return state;
    }
}