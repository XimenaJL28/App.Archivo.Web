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

  getEstudiante(id: number = 13): Estudiante {
    return {
      id: 13,
      ci: '123456789 SCZ',
      folio: '2813',
      nombreCompleto: 'Ximena Justiniano Luján',
      fechaNacimiento: '01-01-1999',
      correoPersonal: 'ximena@mail.com',
      sede: 'Santa Cruz',
      genero: 'Femenino',
      nacionalidad: 'Boliviana',
      office365: 'ximena@mail.com'
    }
  }

  getTramitesAcademicos(estudianteId: number = 13): Academico[] {
    return [
      {
        id: 320,
        carrera: 'Ingenieria de sistemas',
        facultad: 'Ingenieria',
        nivelEstudio: 'Licenciatura',
        fechaRegistro: '14-01-2018',
        estado: 'Vigente',
        modeloEstudio: 'Por objetivo'
      },
      {
        id: 140,
        carrera: 'Marketing y Publicidad',
        facultad: 'Ciencias empresariales',
        nivelEstudio: 'Licenciatura',
        fechaRegistro: '25-02-2020',
        estado: 'Vigente',
        modeloEstudio: 'Por Competencia'
      }
    ]
  }


  getTramitesRealizados(estudianteId: number = 13): Tramite[] {
    return [
      {
        id: 3,
        tramite: 'Admisión',
        carrera: 'Ingenieria de sistemas',
        fechaRegistro: '14-01-2018',
        estado: 'Completo'
      },
      {
        id: 4,
        tramite: 'Movimiento',
        carrera: 'Ingenieria de sistemas',
        fechaRegistro: '14-01-2018',
        estado: 'Completo'
      }
    ]
  }
  getEstudiantesEncontrados(criterio: string): EstudiantesEncontrados[] {
    return [
      {
        id: 5,
        estudiante: "ximena",
        carrera: "derecho",
        facultad: "ciencias",
        estado: "vigente"
      },
      {
        id: 6,
        estudiante: "juan",
        carrera: "derecho",
        facultad: "ciencias",
        estado: "vigente"
      },
      {
        id: 7,
        estudiante: "otis",
        carrera: "derecho",
        facultad: "ciencias",
        estado: "vigente"
      }
    ];
  }


  async Busquedapersona(datos: string) {
    let ans: any = await this.MainService.get(`${environment.endPoint}Basico/BuscarPersona?Parametro=${datos}`);
    return ans;
  }



}
