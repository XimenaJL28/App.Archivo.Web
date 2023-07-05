import { createAction, props } from '@ngrx/store';

export const setEstudiante = createAction(
  '[Estudiante] setEstudiante',
  props<{ estudiante: any }>()
);

export const unSetEstudiante = createAction(
  '[Estudiante] unSetEstudiante'
);

export const setInscripciones = createAction(
  '[Estudiante] setInscripciones',
  props<{ inscripciones: any[] }>()
);

export const unSetInscripciones = createAction(
  '[Estudiante] unSetInscripciones'
);

export const setTramites = createAction(
  '[Estudiante] setTramites',
  props<{ tramites: any[], inscripcion: any }>()
);

export const unSetTramites = createAction(
  '[Estudiante] unSetTramites'
);

export const setTramite = createAction(
  '[Estudiante] setTramite',
  props<{ tramite: any }>()
);

export const unSetTramite = createAction(
  '[Estudiante] unSetTramite'
);

export const setTramiteActiveIndex = createAction(
  '[Estudiante] setTramiteActiveIndex',
  props<{ index: number }>()
);
