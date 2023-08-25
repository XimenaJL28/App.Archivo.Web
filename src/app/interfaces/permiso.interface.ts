export interface Permiso {
    rol: string;
    rutas: string[];
    rutasHijas?: string[];
    componentes?: Componente[];
}

interface Componente {
    nombre: string;
    funciones: string[];
}