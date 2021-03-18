import { ACTUAL_PROJECT, ADD_PROJECT, DELETE_PROJECT, GET_PROJECTS, PROJECT_FORM, VALIDATE_FORM } from "../../types";


export default (state, action) => {
    switch (action.type) {
        case PROJECT_FORM : 
            return {
                ...state,
                form: true
            }
        case GET_PROJECTS: 
            return {
                ...state,
                projects : action.payload
            }
        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload],
                form: false,
                formError: false
            }
        case VALIDATE_FORM:
            return {
                ...state,
                formError: true
            }
        case ACTUAL_PROJECT:
            return {
                ...state,
                project: state.projects.find(project => project.id === action.payload)
            }
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project.id !== action.payload),
                project: null
            }
        default:
            return state;
    }
}