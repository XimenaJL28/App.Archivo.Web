import { DocumentoInscripcionCarrera, DocumentoInscripcionCarreraFaltantes, DocumentoInscripcionCarreraSave, DocumentoInscripcionCarreraUpdate, DropDownItem, Inscripcion, TramiteInscripcionCarrera } from '../interfaces/estudiante.interface';
import { DocumentoOperacion, DocumentoOperacionSave, Tramite } from "../interfaces/tramite.interface";

export function mockInscripcionList(): Inscripcion[] {
  return [
    {
      idInscripcionSede: 1,
      idPersonaSede: 1,
      idPlanEstudio: 1,
      carrera: 'as',
      codigo: 'as',
      sistemaEstudio: 'as',
      modeloEstudio: 'as',
      nivelEstudio: 'as',
    },
    {
      idInscripcionSede: 2,
      idPersonaSede: 1,
      idPlanEstudio: 1,
      carrera: 'as',
      codigo: 'as',
      sistemaEstudio: 'as',
      modeloEstudio: 'as',
      nivelEstudio: 'as',
    }
  ];
}

export function mockTramiteInscripcionList(): TramiteInscripcionCarrera[] {
  return [
    {
      id: 1,
      tramite: 'xj',
      tramiteSubTipoId: 1,
      subTipoTramite: 'xj',
      fechaRegistro: 'xj',
      estado: 'xj',
    }
  ];
}

export function mockDocumentoList(): DocumentoInscripcionCarrera[] {
  return [
    {
      documentoInscripcioncarreraId: 1,
      documentoTipoId: 1,
      nombreDocumentoTipo: 'xj',
      documentoEstadoId: 1,
      nombreDocumentoEstado: 'xj',
      tramiteSubTipoId: 1,
      nombreTramiteSubTipo: 'xj',
      cantidad: 1,
      fechaLimitedeEntrega: 'xj',
      fechaRegistro: 'xj',
      adjunto: 'xj',
      estadoDocumento: false,
      fechaVencimiento: 'xj',
    }
  ];
}

export function mockDocumentoFaltanteList(): DocumentoInscripcionCarreraFaltantes[] {
  return [
    {
      documentoTipoId: 1,
      nombreDocumentoTipo: 'xj',
      tramiteSubTipoId: 1,
    },
    {
      documentoTipoId: 1,
      nombreDocumentoTipo: 'xj',
      tramiteSubTipoId: 1,
    }
  ];
}

export function mockDataDocumentoSave(): DocumentoInscripcionCarreraSave {
  return {
    documentoInscripcioncarreraId: 1,
    nombreDocumentoTipo: 'xj',
    documentoTipoId: 1,
    documentoEstadoId: 1,
    tramiteInscripcionCarreraId: 1,
    tramiteSubTipoId: 1,
    cantidad: 1,
    fechaLimiteEntrega: 'xj',
    fechaRegistro: 'xj',
    adjunto: 'xj',
    documentoTipoEstado: false,
    fechaVencimiento: 'xj',
  }
}

export function mockDataDocumentoUpdate(): DocumentoInscripcionCarreraUpdate {
  return {
    documentoInscripcionCarreraId: 1,
    documentoEstadoId: 1,
    cantidad: 1,
    fechaLimitedeEntrega: 'xj',
    adjunto: 'xj',
    fechaVencimiento: 'xj',
  }
}

export function mockDataOperacionSave(): DocumentoOperacionSave {
  return {
    documentoInscripcionCarreraId: 1,
    funcionarioId: 1,
    documentoOperacionTipoId: 1,
    descripcion: 'xj',
    estado: false,
    fechaOperacion: 'xj',
    adjunto: 'xj',
  }
}

export function mockDataOperacionResponse(): DocumentoOperacion {
  return {
    documentoOperacionId: 1,
    funcionarioId: 1,
    nombreFuncionario: 'xj',
    descripcion: 'xj',
    estado: false,
    fechaOperacion: 'xj',
    adjunto: 'xj',
    documentoOperacionTipoId: 1,
    nombreDocumentoOperacionTipo: 'xj',
  }
}

export function mockOperacionList(): DocumentoOperacion[] {
  return [
    {
      documentoOperacionId: 1,
      funcionarioId: 1,
      nombreFuncionario: 'xj',
      descripcion: 'xj',
      estado: false,
      fechaOperacion: 'xj',
      adjunto: 'xj',
      documentoOperacionTipoId: 1,
      nombreDocumentoOperacionTipo: 'xj',
    },
    {
      documentoOperacionId: 1,
      funcionarioId: 1,
      nombreFuncionario: 'xj',
      descripcion: 'xj',
      estado: false,
      fechaOperacion: 'xj',
      adjunto: 'xj',
      documentoOperacionTipoId: 1,
      nombreDocumentoOperacionTipo: 'xj',
    }
  ];
}

export function mockTramiteList(): Tramite[] {
  return [
    {
      idTramite: 13,
      nombre: 'string',
      unidadAcademicaId: 2813,
      nombreUnidadAcademica: 'string',
    },
    {
      idTramite: 28,
      nombre: 'string',
      unidadAcademicaId: 2813,
      nombreUnidadAcademica: 'string',
    }
  ]
}

export function mockDropDownList(): DropDownItem[] {
  return [
    {
      id: 1,
      nombre: 'xj',
    },
    {
      id: 2,
      nombre: 'xj2813',
    },
    {
      id: 3,
      nombre: 'xj2813',
    }
  ];
}
