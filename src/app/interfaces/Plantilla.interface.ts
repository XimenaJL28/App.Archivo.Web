export interface DocumentoPlantillaDTO {
    cantidadMinima: number
    plazoMaximo: number
    obligatorio: boolean
    estado: boolean
    carreraId: number
    tramiteSubTipoId: number
    documentoTipoId: number
    estadoId: number
}

//Agregar documentos a la plantilla
export interface AddPlantillaDTO {
    carreraId: number
    tramiteSubTipoId: number
    listaDocumento: ListaDocumento[]
}

export interface ListaDocumento {
    cantidadMinima: number
    plazoMaximo: number
    documentoTipoId: number
    estadoId: number
}

//tramite
export interface tramite {
    idTramite: number
    nombre: string
    items: ListaTramiteDTO[]
}
//ListaTramiteSubTramite
export interface ListaTramiteDTO {
    id: number
    nombre: string
}

//lista tramite
export interface ListCarreraDTO {
    id: number
    nombre: string
    nombreCorto: string
}

//Estados de un documento en una plantilla
export interface EstadoDocumentoDTO {
    documentoEstadoId: number
    nombre: string
    estado: boolean
}

export interface TipoDocuemntoDTO {
    documentoTipoId: number
    nombre: string
    estadoExpiracion: boolean
    documentoRespaldoId: any
    documentoRespaldo: any
}

export interface EstadoPlantillaDTO {
    estadoId: number
    nombre: string
}
