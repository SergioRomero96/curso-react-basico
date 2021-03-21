import React, { useReducer } from 'react';
import {v4 as uuidv4} from 'uuid';
import { ACTUAL_TASK, ADD_TASK, CLEAN_TASK, DELETE_TASK, PROJECT_TASKS, TASK_STATUS, UPDATE_TASK, VALIDATE_TASK } from '../../types';
import TaskContext from './taskContext';
import taskReducer from './taskReducer';

const TaskState = props => {
    const initialState = {
        tasks: [
            {id: 1, name: 'Elegir Plataforma', status: true, projectId: 1 },
            {id: 2, name: 'Elegir Colores', status: false, projectId: 2 },
            {id: 3, name: 'Elegir Hosting', status: true, projectId: 1 },
        ],
        projectTasks: null,
        taskError: false,
        selectedTask: null
    }

    // crear dispatch y state
    const [state, dispatch] = useReducer(taskReducer, initialState);

    // obtener las tareas de un proyecto
    const getTasks = projectId => {
        dispatch({
            type: PROJECT_TASKS,
            payload: projectId
        })
    }

    // agregar una tarea al proyecto seleccionado
    const addTask = task => {
        task.id = uuidv4();
        dispatch({
            type: ADD_TASK,
            payload: task
        })
    }

    // valida y muestra una error en caso de que sea necesario
    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK
        })
    }

    // eliminar tarea por id
    const deleteTask = id => {
        dispatch({
            type: DELETE_TASK,
            payload: id
        })
    }

    // cambia el estado de cada tarea
    const changeTaskStatus = task => {
        dispatch({
            type: TASK_STATUS,
            payload: task
        })
    }

    // extrae una tarea para edicion
    const setActualTask = task => {
        dispatch({
            type: ACTUAL_TASK,
            payload: task
        })
    }

    // edita una tarea
    const updateTask = task => {
        dispatch({
            type: UPDATE_TASK,
            payload: task
        })
    }

    const cleanTask = () => {
        dispatch({
            type: CLEAN_TASK
        })
    }

    return (
        <TaskContext.Provider
            value={{
                tasks: state.tasks,
                projectTasks: state.projectTasks,
                taskError: state.taskError,
                selectedTask: state.selectedTask,
                getTasks,
                addTask,
                validateTask,
                deleteTask,
                changeTaskStatus,
                setActualTask,
                updateTask,
                cleanTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;