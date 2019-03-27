import { User } from "./user.model";
import { acciones, SET_USER, UNSET_USER } from "./auth.actions";

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
                user: {...(<any>accion).user}
            }
        case UNSET_USER:
            
            return {
                user: null
            }
    
        default:
            return state;
    }
}