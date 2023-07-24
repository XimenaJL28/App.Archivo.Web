import { Persona } from "../interfaces/estudiante.interface";

export function mockPersonaList(): Persona[] {
    return [
        {
            id: 1,
            celular: '',
            documentoIdentidad: '',
            fechaNacimiento: '',
            foto: '',
            genero: '',
            nacionalidad: '',
            nombreCompleto: '',
            nroFolio: 0,
            sede: ''
        },
        {
            id: 2,
            celular: '',
            documentoIdentidad: '',
            fechaNacimiento: '',
            foto: '',
            genero: '',
            nacionalidad: '',
            nombreCompleto: '',
            nroFolio: 0,
            sede: ''
        }
    ]
}