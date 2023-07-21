import { createAction, props } from '@ngrx/store';
import { DocumentoInscripcionCarrera, DropDownItem } from 'src/app/interfaces/estudiante.interface';
import { DocumentoOperacion } from 'src/app/interfaces/tramite.interface';
import { DocumentoInscripcionCarreraFaltantes } from '../../interfaces/estudiante.interface';

export const setDocumentos = createAction(
  '[Tramite] setDocumentos',
  props<{ documentos: DocumentoInscripcionCarrera[], documentosFaltantes: DocumentoInscripcionCarreraFaltantes[] }>()
);

export const unSetDocumentos = createAction(
  '[Tramite] unSetDocumentos'
);

export const setDocumento = createAction(
  '[Tramite] setDocumento',
  props<{ documento: DocumentoInscripcionCarrera, operaciones:DocumentoOperacion[] }>()
);

export const unSetDocumento = createAction(
  '[Tramite] unSetDocumento'
);

export const setDocumentoFaltante = createAction(
  '[Tramite] setDocumentoFaltante',
  props<{ documentoFaltante: DocumentoInscripcionCarreraFaltantes }>()
);

export const setSelectedDocumentoOperacionTipo = createAction(
  '[Tramite] setSelectedDocumentoOperacionTipo',
  props<{ documentoOperacionTipo: DropDownItem }>()
);

export const setOperacion = createAction(
  '[Tramite] setOperacion',
  props<{ operacion: DocumentoOperacion }>()
);

export const unSetOperacion = createAction(
  '[Tramite] unSetOperacion'
);

export const setOperaciones = createAction(
  '[Tramite] setOperaciones',
  props<{ operaciones: DocumentoOperacion[] }>()
);

export const unSetOperaciones = createAction(
  '[Tramite] unSetOperaciones'
);

/*
export const addItemDocumento = createAction(
  '[Tramite] addItemDocumento',
  props<{ documento: DocumentoInscripcionCarrera }>()
);

export const updItemDocumento = createAction(
  '[Tramite] updItemDocumento',
  props<{ documento: DocumentoInscripcionCarrera }>()
);

export const addItemOperacion = createAction(
  '[Tramite] addItemOperacion',
  props<{ operacion: DocumentoOperacion }>()
);

export const updItemOperacion = createAction(
  '[Tramite] updItemOperacion',
  props<{ operacion: DocumentoOperacion }>()
);
*/
