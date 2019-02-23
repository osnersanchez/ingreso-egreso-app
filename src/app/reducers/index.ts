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

export interface AppState {
  ui: StateUI,
  user: StateAuth
}

export const reducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  user: AuthReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
