export interface Permiso {
    id: number;
    titulo: string;
    descripcion: string;
    ubicacion: string;
    enlaceTutorial: string;
    tipo: number;
    idModulo: number;
    icono: string;
    estado: boolean;
    tareas: Tarea[];
}

export interface Tarea {
    id: number;
    nombre: string;
    descripcion: string;
    idInterface: number;
    tipo: number;
}

export interface PermisoInterfaceId {
    id: number;
    enlace: string;
}

export interface PermisoUsuario {
    id: number;
    tareas: TareaUsuario[];
}

export interface TareaUsuario {
    id: number;
    tipo: number;
}