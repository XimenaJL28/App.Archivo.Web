import { createReducer, on } from '@ngrx/store';
import { setDocumento, setDocumentos, setOperacion, setOperaciones, unSetDocumento, unSetDocumentos, unSetOperacion, unSetOperaciones } from '../actions/tramite.actions';

export interface TramiteState {
  documentos: any[];
  documento: any;
  operaciones: any[];
  operacion: any;
}

export const initialState: TramiteState = {
  documentos: [],
  documento: null,
  operaciones: [],
  operacion: null,
}

export const tramiteReducer = createReducer(
  initialState,
  on(setDocumentos, (state, { documentos }) => (
    {
      ...state,
      documentos: [...documentos],
      documento: null,
      operaciones: [],
      operacion: null,
    })),

  on(unSetDocumentos, (state) => (
    {
      ...state,
      documentos: [],
      documento: null,
      operaciones: [],
      operacion: null,
    })),

  on(setDocumento, (state, { documento }) => (
    {
      ...state,
      documento: { ...documento },
      operaciones: [],
      operacion: null,
    })),

  on(unSetDocumento, (state) => (
    {
      ...state,
      documento: null,
      operaciones: [],
      operacion: null,
    })),

  on(setOperaciones, (state, { operaciones }) => (
    {
      ...state,
      operaciones: [...operaciones],
      operacion: null,
    })),

  on(unSetOperaciones, (state) => (
    {
      ...state,
      operaciones: [],
      operacion: null,
    })),

  on(setOperacion, (state, { operacion }) => (
    {
      ...state,
      operacion: { ...operacion },
    })),

  on(unSetOperacion, (state) => (
    {
      ...state,
      operacion: null,
    })),
)