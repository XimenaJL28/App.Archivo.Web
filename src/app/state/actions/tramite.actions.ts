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
  props<{ documento: any }>()
);

export const unSetDocumento = createAction(
  '[Tramite] unSetDocumento'
);

export const setOperaciones = createAction(
  '[Tramite] setOperaciones',
  props<{ operaciones: any[] }>()
);

export const unSetOperaciones = createAction(
  '[Tramite] unSetOperaciones'
);

export const setOperacion = createAction(
  '[Tramite] setOperacion',
  props<{ operacion: any }>()
);

export const unSetOperacion = createAction(
  '[Tramite] unSetOperacion'
);
