import { createAction, props } from '@ngrx/store';

export const setDocumentos = createAction(
  '[Tramite] setDocumentos',
  props<{ documentos: any[], documentosFaltantes: any[] }>()
);

export const unSetDocumentos = createAction(
  '[Tramite] unSetDocumentos'
);

export const setDocumento = createAction(
  '[Tramite] setDocumento',
  props<{ documento: any, operaciones:any[] }>()
);

export const unSetDocumento = createAction(
  '[Tramite] unSetDocumento'
);

export const setOperacion = createAction(
  '[Tramite] setOperacion',
  props<{ operacion: any }>()
);

export const unSetOperacion = createAction(
  '[Tramite] unSetOperacion'
);

export const addItemOperacion = createAction(
  '[Tramite] addItemOperacion',
  props<{ operacion: any }>()
);

export const addItemDocumento = createAction(
  '[Tramite] addItemDocumento',
  props<{ documento: any }>()
);

export const setSelectedDocumentoOperacionTipo = createAction(
  '[Tramite] setSelectedDocumentoOperacionTipo',
  props<{ documentoOperacionTipo: any }>()
);
