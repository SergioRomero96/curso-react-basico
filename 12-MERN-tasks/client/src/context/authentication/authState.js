import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // las funciones


    return (
        <AuthContext.Provider value={{
            token: state.token,
            authenticated: state.authenticated,
            user: state.user,
            message: state.message
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;