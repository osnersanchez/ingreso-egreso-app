import { Action } from "@ngrx/store";
import { User } from "./user.model";

export const SET_USER = '[Auth] Set User'
export const UNSET_USER = '[Auth] Unset User'

export class SetUser implements Action {
    readonly type: string = SET_USER;

    constructor(public user:User){

    }
}

export class UnsetUser implements Action {
    readonly type: string = UNSET_USER;
}

export type acciones = SetUser | UnsetUser;