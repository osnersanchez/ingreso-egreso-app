import { Action } from "@ngrx/store";
import { IngreEgreso } from "./ingreso-egreso.model";

export const UNSET_ITEMS = '[IngresoEgreso] Unset Items'
export const SET_ITEMS = '[IngresoEgreso] Set Items'

export class SetItemsAction implements Action {
    readonly type: string = SET_ITEMS;

    constructor(public items: IngreEgreso[]) {
    }
}

export class UsetItemsAction implements Action {
    readonly type: string = UNSET_ITEMS;
}

export type acciones = SetItemsAction | UsetItemsAction;