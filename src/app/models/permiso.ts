import { Permiso } from "../interfaces/permiso.interface";

const admin: Permiso = {
    rol: 'admin',
    rutas: ['/', '/home', '/tramites', '/tramite', '/tramite/inscripcion', '/tramite/documento'],
    rutasHijas: ['/tramite/inscripcion', '/tramite/documento'],
}

const student: Permiso = {
    rol: 'student',
    rutas: ['/', '/home', '/tramite/inscripcion', '/tramite/documento'],
    rutasHijas: ['/tramite/inscripcion', '/tramite/documento'],
    componentes: [
        {
            nombre: 'DocumentoFormComponent',
            funciones: ['guardarDocumento']
        }
    ]
}
export const RBAC: Permiso[] = [
    admin,
    student
];