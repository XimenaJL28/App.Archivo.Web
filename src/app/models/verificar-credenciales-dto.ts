export interface VerificarCredencialesDTO {
    correo: string;
    documento: string;
    foto: string;
    id: number;
    nombre: string;
    primerApellido: string;
    sedesDocente: any[];
    sedesEstudiante: SedesEstudiante[];
    sedesFuncionario: any[];
    segundoApellido: string;
    userToken: UserToken;
}

export interface SedesEstudiante {
    estado: boolean;
    id: number;
    nombre: string;
    nombreCorto: string;
}

export interface UserToken {
    expiracion: Date;
    token: string;
}
