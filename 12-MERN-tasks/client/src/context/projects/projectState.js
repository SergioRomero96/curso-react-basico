import React, { useReducer } from 'react';
import {v4 as uuidv4} from 'uuid';

import projectContext from './projectContext';
import projectReducer from './projectReducer';
import { ACTUAL_PROJECT, ADD_PROJECT, DELETE_PROJECT, GET_PROJECTS, PROJECT_FORM, VALIDATE_FORM } from '../../types';



const ProjectState = props => {
    const projects = [
        {id: 1, name: 'Tienda Virtual' },
        {id: 2, name: 'Intranet' }
    ]

    const initialState = {
        projects : [],
        form: false,
        formError: false,
        project: null
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

    // Agregar nuevo proyecto
    const addProject = project => {
        project.id = uuidv4();

        // insertar el proyecto en el state
        dispatch({
            type: ADD_PROJECT,
            payload: project
        })
    }

    // Validar el formulario por errores
    const showError = () => {
        dispatch({
            type: VALIDATE_FORM
        })
    }

    // Selecciona el proyecto que el usuario dio click
    const actualProject = projectId => {
        dispatch({
            type: ACTUAL_PROJECT,
            payload: projectId
        })
    }

    // Elimina un proyecto
    const deleteProject = projectId => {
        dispatch({
            type: DELETE_PROJECT,
            payload: projectId
        })
    }

    return (
        <projectContext.Provider value={{
            projects: state.projects,
            form: state.form,
            formError: state.formError,
            project: state.project,
            showForm,
            getProjects,
            addProject,
            showError,
            actualProject,
            deleteProject
        }}>
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;