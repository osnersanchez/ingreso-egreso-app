import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { StateUI, uiReducer } from '../shared/ui.reducer';
import { StateAuth, AuthReducer } from '../auth/auth.reducer';
import { IngresosEgresosReducer, StateIngresosEgresos } from '../ingreso-egreso/ingreso-egreso.reducer';

export interface AppState {
  ui: StateUI,
  user: StateAuth,
  // items: StateIngresosEgresos
}

export const reducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  user: AuthReducer,
  // items: IngresosEgresosReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
