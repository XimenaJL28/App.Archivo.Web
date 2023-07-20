import { createReducer, on } from '@ngrx/store';
import { Inscripcion, Persona, TramiteInscripcionCarrera, TramitesRealizados } from 'src/app/interfaces/estudiante.interface';
import { setEstudiante, unSetEstudiante, setInscripciones, unSetInscripciones, setTramites, unSetTramites, setTramite, unSetTramite, setTramiteActiveIndex } from '../actions/estudiante.actions';

export interface EstudianteState {
  estudiante: Persona | undefined;
  inscripciones: Inscripcion[];
  inscripcion: Inscripcion | undefined;
  tramites: TramitesRealizados[];
  tramite: TramiteInscripcionCarrera | undefined;
  tramiteActiveIndex: number;
}

export const initialState: EstudianteState = {
  estudiante: undefined,
  inscripciones: [],
  inscripcion: undefined,
  tramites: [],
  tramite: undefined,
  tramiteActiveIndex: -1,
};

export const estudianteReducer = createReducer(
  initialState,
  on(setEstudiante, (state, { estudiante }) => (
    {
      ...state,
      estudiante: { ...estudiante },
      inscripciones: [],
      inscripcion: undefined,
      tramites: [],
      tramite: undefined,
    })),

  on(unSetEstudiante, (state) => (
    {
      ...state,
      estudiante: undefined,
      inscripciones: [],
      inscripcion: undefined,
      tramites: [],
      tramite: undefined,
    })),

  on(setInscripciones, (state, { inscripciones }) => (
    {
      ...state,
      inscripciones: [...inscripciones],
      inscripcion: undefined,
      tramites: [],
      tramite: undefined,
    })),

  on(unSetInscripciones, (state) => (
    {
      ...state,
      inscripciones: [],
      inscripcion: undefined,
      tramites: [],
      tramite: undefined,
    })),

  on(setTramites, (state, { tramites, inscripcion }) => (
    {
      ...state,
      inscripcion: { ...inscripcion },
      tramites: [...tramites],
      tramite: undefined,
    })),

  on(unSetTramites, (state) => (
    {
      ...state,
      inscripcion: undefined,
      tramites: [],
      tramite: undefined,
    })),

  on(setTramite, (state, { tramite }) => (
    {
      ...state,
      tramite: { ...tramite }
    })),

  on(unSetTramite, (state) => (
    {
      ...state,
      tramite: undefined,
    })),

  on(setTramiteActiveIndex, (state, { index }) => (
    {
      ...state,
      tramiteActiveIndex: index
    })),
);
