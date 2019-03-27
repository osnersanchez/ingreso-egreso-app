import { IngreEgreso } from "./ingreso-egreso.model";
import { AppState } from '../reducers/index'
import { SET_ITEMS, UNSET_ITEMS, acciones } from "./ingreso-egreso.actions";

export interface StateIngresosEgresos {
    items: IngreEgreso[];
}

export interface AppState extends AppState {
    items: StateIngresosEgresos;
}

const initState: StateIngresosEgresos = {
    items: []
}

export function IngresosEgresosReducer(state = initState, accion: acciones): StateIngresosEgresos {
    switch (accion.type) {
        case SET_ITEMS:
            return {
                items: [...(<any>accion).items.map(val => {
                    return { ...val }
                })]
            }

        case UNSET_ITEMS:
            return {
                items: []
            }

        default:
            return state;
    }
}