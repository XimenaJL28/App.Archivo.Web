import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { environment } from 'src/environments/environment';

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
