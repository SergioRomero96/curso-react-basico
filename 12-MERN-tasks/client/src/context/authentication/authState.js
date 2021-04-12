import React, { useReducer } from 'react';
import clientAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import { GET_USER, LOGIN_ERROR, LOGOUT, REGISTRATION_ERROR, SUCCESSFUL_LOGIN, SUCCESSFUL_REGISTRATION } from '../../types';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null,
        loading: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // las funciones
    const registerUser = async data => {
        try {
            const response = await clientAxios.post('/api/users', data);
            console.log(response.data);
            dispatch({
                type: SUCCESSFUL_REGISTRATION,
                payload: response.data
            });

            // obtener el usuario
            getAuthenticatedUser();
        } catch (error) {
            // console.log(error.response.data.msg);
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: REGISTRATION_ERROR,
                payload: alert
            })
        }
    }

    // retorna el usuario autenticado
    const getAuthenticatedUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            // enviar token por headers
            tokenAuth(token);
        }

        try {
            const response = await clientAxios.get('/api/auth');
            dispatch({
                type: GET_USER,
                payload: response.data.user
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    // cuando el usuario inicia sesión
    const login = async (data) => {
        try {
            const response = await clientAxios.post('/api/auth', data);
            console.log(response);
            dispatch({
                type: SUCCESSFUL_LOGIN,
                payload: response.data
            });

            getAuthenticatedUser();
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            })
        }
    }

    // cierra la sesión del usuario
    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    }


    return (
        <AuthContext.Provider value={{
            token: state.token,
            authenticated: state.authenticated,
            user: state.user,
            message: state.message,
            loading: state.loading,
            registerUser,
            login,
            getAuthenticatedUser,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;