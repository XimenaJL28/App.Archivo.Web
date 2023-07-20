import { createAction, props } from '@ngrx/store';
import { Inscripcion, Persona, TramiteInscripcionCarrera, TramitesRealizados } from 'src/app/interfaces/estudiante.interface';

export const setEstudiante = createAction(
  '[Estudiante] setEstudiante',
  props<{ estudiante: Persona }>()
);

export const unSetEstudiante = createAction(
  '[Estudiante] unSetEstudiante'
);

export const setInscripciones = createAction(
  '[Estudiante] setInscripciones',
  props<{ inscripciones: Inscripcion[] }>()
);

export const unSetInscripciones = createAction(
  '[Estudiante] unSetInscripciones'
);

export const setTramites = createAction(
  '[Estudiante] setTramites',
  props<{ tramites: TramitesRealizados[], inscripcion: Inscripcion }>()
);

export const unSetTramites = createAction(
  '[Estudiante] unSetTramites'
);

export const setTramite = createAction(
  '[Estudiante] setTramite',
  props<{ tramite: TramiteInscripcionCarrera }>()
);

export const unSetTramite = createAction(
  '[Estudiante] unSetTramite'
);

export const setTramiteActiveIndex = createAction(
  '[Estudiante] setTramiteActiveIndex',
  props<{ index: number }>()
);
