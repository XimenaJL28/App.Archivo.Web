export interface BuscarPersona {
    id: number
    nombreCompleto: string
    celular: string
    documentoIdentidad: string
    genero: string
    fechaNacimiento: string
    nacionalidad: string
    foto: string
    sede: string

}

export interface Buscar extends Omit<BuscarPersona, 'id' | 'fechaNacimiento' | 'foto'> {
    dedos: string;
}

export interface InscripcionEstudiante {
    idInscripcionSede: number;
    idPersonaSede: number;
    carrera: string;
    codigo: string;
    sistemaEstudio: string;
    modeloEstudio: string;
    nivelEstudio: string;
}

export interface TramiteInscripcion {
    id: number;
    tramite: string;
    subTipoTramite: string;
    fechaRegistro: Date;
    estado: string;
}
