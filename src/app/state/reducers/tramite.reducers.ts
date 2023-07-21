import { createReducer, on } from '@ngrx/store';
import { DocumentoInscripcionCarrera, DocumentoInscripcionCarreraFaltantes, DropDownItem } from '../../interfaces/estudiante.interface';
import { DocumentoOperacion } from '../../interfaces/tramite.interface';
import { setDocumento, setDocumentoFaltante, setDocumentos, setOperacion, setOperaciones, setSelectedDocumentoOperacionTipo, unSetDocumento, unSetDocumentos, unSetOperacion, unSetOperaciones } from '../actions/tramite.actions';

export interface TramiteState {
  documentos: DocumentoInscripcionCarrera[];
  documento: DocumentoInscripcionCarrera | undefined;
  documentosFaltantes: DocumentoInscripcionCarreraFaltantes[];
  operaciones: DocumentoOperacion[];

  documentoFaltante: DocumentoInscripcionCarreraFaltantes | undefined;
  operacion: DocumentoOperacion | undefined;
  documentoOperacionTipo: DropDownItem | undefined;
}

export const initialState: TramiteState = {
  documentos: [],
  documento: undefined,
  documentosFaltantes: [],
  operaciones: [],

  documentoFaltante: undefined,
  operacion: undefined,
  documentoOperacionTipo: undefined,
}

export const tramiteReducer = createReducer(
  initialState,
  on(setDocumentos, (state, { documentos, documentosFaltantes }) => (
    {
      ...state,
      documentos: [...documentos],
      documento: undefined,
      documentosFaltantes: [...documentosFaltantes],
      operaciones: [],
      operacion: undefined,
      documentoFaltante: undefined,
    })),

  on(unSetDocumentos, (state) => (
    {
      ...state,
      documentos: [],
      documento: undefined,
      documentosFaltantes: [],
      operaciones: [],
      operacion: undefined,
    })),

  on(setDocumento, (state, { documento, operaciones }) => (
    {
      ...state,
      documento: { ...documento },
      operaciones: [...operaciones],
      operacion: undefined,
    })),

  on(unSetDocumento, (state) => (
    {
      ...state,
      documento: undefined,
      operaciones: [],
      operacion: undefined,
    })),

  on(setDocumentoFaltante, (state, { documentoFaltante }) => (
    {
      ...state,
      documentoFaltante: { ...documentoFaltante },
    })),

  on(setOperacion, (state, { operacion }) => (
    {
      ...state,
      operacion: { ...operacion },
    })),

  on(unSetOperacion, (state) => (
    {
      ...state,
      operacion: undefined,
    })),

  on(setSelectedDocumentoOperacionTipo, (state, { documentoOperacionTipo }) => (
    {
      ...state,
      documentoOperacionTipo: { ...documentoOperacionTipo },
    })),

  on(setOperaciones, (state, { operaciones }) => (
    {
      ...state,
      operaciones: [...operaciones],
      operacion: undefined,
    })),

  on(unSetOperaciones, (state) => (
    {
      ...state,
      operaciones: [],
      operacion: undefined,
    })),
  /*
    on(addItemDocumento, (state, { documento }) => (
    {
      ...state,
      documentos: [{ ...documento }, ...state.documentos],
      documento: { ...documento },
    })),

  on(updItemDocumento, (state, { documento }) => (
    {
      ...state,
      documentos: [{ ...documento }, state.documentos.filter(item => item.documentoInscripcioncarreraId !== documento?.documentoInscripcioncarreraId)],
      documento: { ...documento },
    }
  )),

  on(addItemOperacion, (state, { operacion }) => (
    {
      ...state,
      operaciones: [{ ...operacion }, ...state.operaciones],
      operacion: { ...operacion },
    })),
  on(updItemOperacion, (state, { operacion }) => (
    {
      ...state,
      operaciones: [{ ...operacion }, state.operaciones.filter(item => item.documentoOperacionId !== operacion?.documentoOperacionId)],
      operacion: { ...operacion },
    })),
    */
)
