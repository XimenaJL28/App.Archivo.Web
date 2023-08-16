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

//ListaTramiteSubTramite
export interface TramiteDTO {
    idTramite: number
    nombre: string
    subTramiteDTO: SubTramiteDto[]
}

export interface SubTramiteDto {
    id: number
    nombre: string
    nombreCorto: string
}

//lista tramite
export interface ListCarreraDTO {
    id: number
    nombre: string
}

//Estados de un documento en una plantilla
export interface EstadoDocumentoDTO {
    documentoEstadoId: number
    nombre: string
    estado: boolean
}