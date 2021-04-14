import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import projectContext from './projectContext';
import projectReducer from './projectReducer';
import { ACTUAL_PROJECT, ADD_PROJECT, DELETE_PROJECT, GET_PROJECTS, PROJECT_ERROR, PROJECT_FORM, VALIDATE_FORM } from '../../types';
import clientAxios from '../../config/axios';



const ProjectState = props => {

    const initialState = {
        projects: [],
        form: false,
        formError: false,
        project: null,
        message: null
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
        clientAxios.get('/api/projects')
            .then(response => {
                dispatch({
                    type: GET_PROJECTS,
                    payload: response.data.projects
                })
            }).catch(error => {
                const alert = {
                    msg: 'Hubo un error',
                    category: 'alerta-error'
                }
                dispatch({
                    type: PROJECT_ERROR,
                    payload: alert
                })
            });
    }

    // Agregar nuevo proyecto
    const addProject = async project => {
        try {
            const response = await clientAxios.post('/api/projects', project);
            // insertar el proyecto en el state
            dispatch({
                type: ADD_PROJECT,
                payload: response.data
            })
        } catch (error) {
            const alert = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }

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
    const deleteProject = async projectId => {
        try {
            await clientAxios.delete(`/api/projects/${projectId}`);
            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            })
        } catch (error) {
            const alert = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    return (
        <projectContext.Provider value={{
            projects: state.projects,
            form: state.form,
            formError: state.formError,
            project: state.project,
            message: state.message,
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