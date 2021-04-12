import React, { useReducer } from 'react';
import { HIDE_ALERT, SHOW_ALERT } from '../../types';
import alertContext from './alertContext';
import alertReducer from './alertReducer';

const AlertState = props => {
    const initialState = {
        alert: null
    }

    const [state, dispatch] = useReducer(alertReducer, initialState);

    // funciones
    const showAlert = (msg, category) => {
        dispatch({
            type: SHOW_ALERT,
            payload: {
                msg, category
            }
        });

        // Después de 5 segundos limpiar la alerta
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 5000);
    }

    return (
        <alertContext.Provider value={{
            alert: state.alert,
            showAlert
        }}>
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertState;