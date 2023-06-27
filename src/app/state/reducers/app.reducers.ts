import { ActionReducerMap } from "@ngrx/store";
import { themeReducer, ThemeState } from '../../state/reducers/theme.reducer';
import { userReducer, UserState } from '../../state/reducers/user.reducer';

import { EstudianteState, estudianteReducer } from '../reducers/estudiante.reducers';
import { tramiteReducer, TramiteState } from './tramite.reducers';

export interface AppState {
  theme: ThemeState,
  user: UserState,
  estudiante: EstudianteState,
  tramite: TramiteState

}

export const appReducers: ActionReducerMap<AppState> = {
  theme: themeReducer,
  user: userReducer,
  estudiante: estudianteReducer,
  tramite: tramiteReducer
}
