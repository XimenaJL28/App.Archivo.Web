import { Archivo } from "./archivo";
import { Estudiante } from "./estudiante";
import { Funcionario } from "./funcionario";
import { Operacion } from "./operacion";

export interface Documento {
  id?:number;
  funcionario: Funcionario;
  operacion:Operacion;
  estudiante:Estudiante;
  archivos?: Archivo[];
}
