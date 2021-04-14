import React, { useReducer } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import clientAxios from '../../config/axios';
import { ACTUAL_TASK, ADD_TASK, CLEAN_TASK, DELETE_TASK, PROJECT_TASKS, UPDATE_TASK, VALIDATE_TASK } from '../../types';
import TaskContext from './taskContext';
import taskReducer from './taskReducer';

const TaskState = props => {
    const initialState = {
        projectTasks: [],
        taskError: false,
        selectedTask: null
    }

    // crear dispatch y state
    const [state, dispatch] = useReducer(taskReducer, initialState);

    // obtener las tareas de un proyecto
    const getTasks = async project => {
        try {
            const response = await clientAxios.get('/api/tasks', { params: { project } });
            console.log(response);
            dispatch({
                type: PROJECT_TASKS,
                payload: response.data.tasks
            })
        } catch (error) {
            console.log(error);
        }
    }

    // agregar una tarea al proyecto seleccionado
    const addTask = async task => {
        try {
            const response = await clientAxios.post('/api/tasks', task);
            console.log(response);
            dispatch({
                type: ADD_TASK,
                payload: task
            })
        } catch (error) {
            console.log(error);
        }
    }

    // valida y muestra una error en caso de que sea necesario
    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK
        })
    }

    // eliminar tarea por id
    const deleteTask = async (id, project) => {
        try {
            await clientAxios.delete(`/api/tasks/${id}`, { params: { project } })
            dispatch({
                type: DELETE_TASK,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }

    // // cambia el estado de cada tarea
    // const changeTaskStatus = task => {
    //     dispatch({
    //         type: TASK_STATUS,
    //         payload: task
    //     })
    // }

    // edita una tarea
    const updateTask = async task => {
        try {
            const response = await clientAxios.put(`/api/tasks/${task._id}`, task)
            console.log(response);
            dispatch({
                type: UPDATE_TASK,
                payload: response.data.taskExists
            })
        } catch (error) {
            console.log(error);
        }

    }

    // extrae una tarea para edicion
    const setActualTask = task => {
        dispatch({
            type: ACTUAL_TASK,
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