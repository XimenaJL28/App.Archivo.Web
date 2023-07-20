export interface Persona {
    id: number;
    nombreCompleto: string;
    celular: string;
    documentoIdentidad: string;
    genero: string;
    fechaNacimiento: string;
    nacionalidad: string;
    foto: string;
    sede: string;
    nroFolio: number;
  }
  
  export interface Inscripcion {
    idInscripcionSede: number;
    idPersonaSede: number;
    idPlanEstudio: number;
    carrera: string;
    codigo: string;
    sistemaEstudio: string;
    modeloEstudio: string;
    nivelEstudio: string;
  }
  
  export interface TramiteInscripcionCarrera {
    id: number;
    tramite: string;
    tramiteSubTipoId: number;
    subTipoTramite: string;
    fechaRegistro: string;
    estado: string;
  }
  
  export interface DocumentoInscripcionCarrera {
    documentoInscripcioncarreraId: number;
    documentoTipoId: number;
    nombreDocumentoTipo?: string;
    documentoEstadoId: number;
    nombreDocumentoEstado?: string;
    tramiteSubTipoId: number;
    nombreTramiteSubTipo?: string;
    cantidad: number;
    fechaLimitedeEntrega: string;
    fechaRegistro: string;
    adjunto?: string;
    estadoDocumento?: boolean;
    fechaVencimiento?: string;
  }
  
  export interface DocumentoInscripcionCarreraFaltantes {
    documentoTipoId: number;
    nombreDocumentoTipo: string;
    tramiteSubTipoId: number;
  }
  
  export interface DocumentoInscripcionCarreraSave {
    documentoInscripcioncarreraId?: number;
    nombreDocumentoTipo?: string;
    documentoTipoId: number;
    documentoEstadoId: number;
    tramiteInscripcionCarreraId: number;
    tramiteSubTipoId: number;
    cantidad: number;
    fechaLimiteEntrega: string;
    fechaRegistro: string;
    adjunto?: string;
    documentoTipoEstado: boolean;
    fechaVencimiento?: string;
  }
  
  export interface DocumentoInscripcionCarreraUpdate {
    documentoInscripcionCarreraId: number;
    documentoEstadoId: number;
    cantidad: number;
    fechaLimitedeEntrega: string;
    adjunto?: string;
    fechaVencimiento?: string;
  }
  
  export interface TramitesRealizados {
    nombreTramite: string;
    cantidadDeTramites: number;
    tramites: TramiteInscripcionCarrera[];
  }
  
  export interface DropDownItem {
    id: number;
    nombre: string;
  }
  