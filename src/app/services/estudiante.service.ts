import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private readonly mainService: MainService) { }

  async buscarEstudiante(criterio: string) {
    //const url = `${environment.endPoint}/personas`;
    const url = `${environment.endPoint}Archivos/BuscarPersona?text=${criterio}`;
    let ans: any = await this.mainService.get(url);
    return ans;
  }
}
