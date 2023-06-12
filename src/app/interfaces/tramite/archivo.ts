import { Funcionario } from "./funcionario";
import { Operacion } from "./operacion";

export interface Archivo {
  id?:number;
  funcionario:Funcionario;
  operacion: Operacion;
  imagen?:string;
}
