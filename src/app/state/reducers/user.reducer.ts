//? Funcionario

import { createReducer, on } from "@ngrx/store"
import { loadUser } from "../actions/user.actions"

export interface UserState{
    ad: string,
    cargoNombre: string,
    correo: string,
    documento: string,
    estado: boolean,
    foto: string,
    id: number,
    idCargo: number,
    idSede: 0,
    idSedeSesion: number,
    nombre: string,
    primerApellido: string,
    sedeNombre: string,
    sedeSesionNombre: string,
    segundoApellido: string,
}

//TODO: Add property to know when data is loaded from backend or if the data comes as null
export const initialState: UserState = {
    ad: "",
    cargoNombre: "",
    correo: "",
    documento: "",
    estado: false,
    foto: "",
    id: 0,
    idCargo: 0,
    idSede: 0,
    idSedeSesion: 0,
    nombre: "",
    primerApellido: "",
    sedeNombre: "",
    sedeSesionNombre: "",
    segundoApellido: "",
}

export const userReducer = createReducer(
    initialState,
    on(loadUser, (oldState, {data}) => {
        return data;
    })
)