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
        carrera: 'Administracion',
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
  getEstudiantesEncontrados(criterio: string): any[] {
    return [
      {
        id: 5,
        nombreCompleto: "ximena",
        carrera: "Ingenieria de sistemas",
        facultad: "ciencias",
        estado: "vigente",
        documentoIdentidad: 6009590
      },
      {
        id: 6,
        nombreCompleto: "juan",
        carrera: "Ingenieria de sistemas",
        facultad: "ciencias",
        estado: "vigente",
        documentoIdentidad: 6789590
      },
      {
        id: 7,
        nombreCompleto: "otis",
        carrera: "Derecho",
        facultad: "ciencias",
        estado: "vigente",
        documentoIdentidad: 6289590
      }
    ];
  }


  async Searchperson(datos: string) {
    let ans: any = await this.MainService.get(`${environment.endPoint}Basico/BuscarPersona?Parametro=${datos}`);
    return ans;
    /*let ans: any = await this.MainService.get(`http://localhost:3000/personas`);
    return ans;*/
  }
}
