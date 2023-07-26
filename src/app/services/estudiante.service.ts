import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Persona } from '../interfaces/estudiante.interface';

import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private readonly mainService: MainService) { }

  async buscarEstudiante(criterio: string) {
    if (criterio.trim().length == 0) {
      return undefined;
    }
    const url = `${environment.endPoint}Archivos/BuscarPersona?text=${criterio}`;
    let ans = await this.mainService.get<Persona[]>(url);
    return ans;
  }
}
