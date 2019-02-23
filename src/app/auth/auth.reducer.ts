import { User } from "./user.model";
import { acciones, SET_USER } from "./auth.actions";

export interface StateAuth  {
    user: User
}

const initState: StateAuth = {
    user: null
}

export function AuthReducer(state = initState, accion: acciones): StateAuth {
    switch (accion.type) {
        case SET_USER:
            
            return {
                user: {...accion.user}
            }
    
        default:
            return state;
    }
}