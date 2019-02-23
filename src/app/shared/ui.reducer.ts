import { acciones, ACTIVAR_LOADING, DESACTIVAR_LOADING } from "./ui.actions";

export interface StateUI {
    isLoading: boolean;
}

const initState: StateUI = {
    isLoading: false
}

export function uiReducer( state=initState, action: acciones): StateUI{
    switch (action.type) {
        case ACTIVAR_LOADING:
            
            return { isLoading: true };
        case DESACTIVAR_LOADING:
            
            return { isLoading: false };
    
        default:
            return state;
    }
}