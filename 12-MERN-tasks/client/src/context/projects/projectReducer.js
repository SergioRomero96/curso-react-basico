import { GET_PROJECTS, PROJECT_FORM } from "../../types";


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
        default:
            return state;
    }
}