import { ACTUAL_TASK, ADD_TASK, CLEAN_TASK, DELETE_TASK, PROJECT_TASKS, TASK_STATUS, UPDATE_TASK, VALIDATE_TASK } from "../../types";

export default (state, action) => {
    switch (action.type) {
        case PROJECT_TASKS:
            return {
                ...state,
                projectTasks: state.tasks.filter(task => task.projectId === action.payload)
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
                taskError: false
            }
        case VALIDATE_TASK:
            return {
                ...state,
                taskError: true
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }
        case UPDATE_TASK:
        case TASK_STATUS:
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ?
                    action.payload : task),
            }
        case ACTUAL_TASK:
            return {
                ...state,
                selectedTask: action.payload
            }
        case CLEAN_TASK:
            return {
                ...state,
                selectedTask: null,
                taskError: false,
            }
        default:
            return state;
    }
}