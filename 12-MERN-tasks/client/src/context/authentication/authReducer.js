import { SUCCESSFUL_REGISTRATION } from "../../types";

export default (state, action) => {
    switch (action.type) {
        case SUCCESSFUL_REGISTRATION: 
            return;
        default:
            return state;
    }
}