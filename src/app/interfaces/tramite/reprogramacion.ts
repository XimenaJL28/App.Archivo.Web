import { Funcionario } from "./funcionario";

export interface Reprogramacion {
  id?:number;
  funcionario:Funcionario;
  hora:string;
  fechaOperacion:string;
  fechaReprogramacion:string;
  documento:string;
  descripcion:string;
  imagen?:string;
}
