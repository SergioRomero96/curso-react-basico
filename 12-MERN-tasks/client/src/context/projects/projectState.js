import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import { GET_PROJECTS, PROJECT_FORM } from '../../types';



const ProjectState = props => {
    const projects = [
        {id: 1, name: 'Tienda Virtual' },
        {id: 2, name: 'Intranet' }
    ]

    const initialState = {
        projects : [],
        form: false
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(projectReducer, initialState);

    // serie de funciones para el CRUD
    const showForm = () => {
        dispatch({
            type: PROJECT_FORM
        })
    }

    // Obtener los proyectos
    const getProjects = () => {
        dispatch({
            type: GET_PROJECTS,
            payload: projects
        })
    }

    return (
        <projectContext.Provider value={{
            projects: state.projects,
            form: state.form,
            showForm,
            getProjects
        }}>
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;