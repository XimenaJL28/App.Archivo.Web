import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { environment } from 'src/environments/environment';
import { Estudiante } from '../interfaces/estudiante/estudiante';
import { Academico } from '../interfaces/estudiante/academico';
import { Tramite } from '../interfaces/estudiante/tramite';
import { EstudiantesEncontrados } from '../interfaces/estudiante/estudiantesEncontrados';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private readonly MainService: MainService) { }

  async Searchperson(datos: string) {
    let ans: any = await this.MainService.get(`${environment.endPoint}Archivos/BuscarPersona?text=${datos}`);
    return ans;
  }
}
