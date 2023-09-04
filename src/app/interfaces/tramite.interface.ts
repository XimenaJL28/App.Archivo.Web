export interface Tramite {
  idTramite: number;
  nombre: string;
  unidadAcademicaId: number;
  nombreUnidadAcademica: string;
}

export interface TramiteSubTipo {
  tramiteSubTipoId: number;
  nombreSubtramite: string;
  estado: boolean;
  nivelEstudioId: number;
}

export interface DocumentoPlantilla {
  id: number;
  tramite: string;
  tramiteSubTipoId: number;
  subTipoTramite: string;
  fechaRegistro: string;
  estado: string;
  cantidadRequerida: number;
}

export interface TramiteSubTipoDocumentoPlantillas {
  tramiteSubTipoId: number;
  nombreSubtramite: string;
  estado: boolean;
  nivelEstudioId: number;
  documentoPlantillas: DocumentoPlantilla[]
}

export interface DocumentoOperacion {
  documentoOperacionId: number;
  funcionarioId?: number;
  nombreFuncionario?: string;
  descripcion?: string;
  estado: boolean;
  fechaOperacion?: string;
  adjunto?: string;
  documentoOperacionTipoId?: number;
  nombreDocumentoOperacionTipo?: string;
}

export interface DocumentoOperacionSave {
  documentoInscripcionCarreraId?: number;
  funcionarioId?: number;
  documentoOperacionTipoId?: number;
  descripcion?: string;
  estado: boolean;
  fechaOperacion?: string;
  adjunto?: string;
}

export interface DocumentoOperacionTipo {
  documentoOpeacionTipoId: number;
  nombre: string;
}

export interface UnidadAcademica {
  id: number;
  nombre: string;
  niveldeEstudio: NiveldeEstudio[];
}

export interface NiveldeEstudio {
  id: number;
  nombre: string;
}

export interface DocumentoTipo {
  documentoTipoId?: number;
  nombre: string;
  estadoExpiracion: boolean;
  documentoRespaldoId?: number;
  documentoRespaldo?: string;
}

export interface DocumentoRespaldo {
  documentoRespaldoId: number;
  nombre: string;
}
