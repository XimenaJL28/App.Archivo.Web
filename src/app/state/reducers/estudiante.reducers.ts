import { createReducer, on } from '@ngrx/store';
import { setEstudiante, unSetEstudiante, setInscripciones, unSetInscripciones, setTramites, unSetTramites, setTramite, unSetTramite, setTramiteActiveIndex } from '../actions/estudiante.actions';

export interface EstudianteState {
  estudiante: any;
  inscripciones: any[];
  inscripcion: any;
  tramites: any[];
  tramite: any;
  tramiteActiveIndex: number;
}

export const initialState: EstudianteState = {
  estudiante: null,
  inscripciones: [],
  inscripcion: null,
  tramites: [],
  tramite: null,
  tramiteActiveIndex: -1,
};

export const estudianteReducer = createReducer(
  initialState,
  on(setEstudiante, (state, { estudiante }) => (
    {
      ...state,
      estudiante: { ...estudiante },
      inscripciones: [],
      inscripcion: null,
      tramites: [],
      tramite: null,
    })),

  on(unSetEstudiante, (state) => (
    {
      ...state,
      estudiante: null,
      inscripciones: [],
      inscripcion: null,
      tramites: [],
      tramite: null,
    })),

  on(setInscripciones, (state, { inscripciones }) => (
    {
      ...state,
      inscripciones: [...inscripciones],
      inscripcion: null,
      tramites: [],
      tramite: null,
    })),

  on(unSetInscripciones, (state) => (
    {
      ...state,
      inscripciones: [],
      inscripcion: null,
      tramites: [],
      tramite: null,
    })),

  on(setTramites, (state, { tramites, inscripcion }) => (
    {
      ...state,
      inscripcion: { ...inscripcion },
      tramites: [...tramites],
      tramite: null,
    })),

  on(unSetTramites, (state) => (
    {
      ...state,
      inscripcion: null,
      tramites: [],
      tramite: null,
    })),

  on(setTramite, (state, { tramite }) => (
    {
      ...state,
      tramite: { ...tramite }
    })),

  on(unSetTramite, (state) => (
    {
      ...state,
      tramite: null,
    })),

  on(setTramiteActiveIndex, (state, { index }) => (
    {
      ...state,
      tramiteActiveIndex: index
    })),
);
