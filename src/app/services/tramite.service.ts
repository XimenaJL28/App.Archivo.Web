import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { Archivo } from '../interfaces/tramite/archivo';
import { Documento } from '../interfaces/tramite/documento';
import { Operaciones } from '../interfaces/tramite/operaciones';
import { Reprogramacion } from '../interfaces/tramite/reprogramacion';
import { Requerido } from '../interfaces/tramite/requerido';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TramiteService {

  constructor(private readonly MainService: MainService) { }


  getArchivo(): Archivo {
    return {
      funcionario: {
        id: 52364,
        ci: '12345678',
        nombre: 'Carlos Eduardo Chuvé Luján'
      },
      operacion: {
        hora: '13:25',
        operacion: 'Adición',
        fecha: '13-03-2023',
        descripcion: 'Certificado de nacimiento original'
      }
    }
  }
  getDocumento(): Documento {
    return {
      funcionario: {
        id: 85221,
        ci: '12345678',
        nombre: 'Carlos Eduardo Chuvé Luján'
      },
      operacion: {
        hora: '13:25',
        operacion: 'Adición',
        fecha: '12-03-2023',
        descripcion: 'Certificado de nacimiento original',

      },
      estudiante: {
        codigo: '81246',
        nombreCompleto: 'Fátima Lizet Luján',
        carrera: 'Derecho',
      }
    }
  }
  getOperaciones(): Operaciones[] {
    return [
      {
        id: 1,
        operacion: 'Adición',
        funcionario: 'Ximena Justiniano Luján',
        fecha: '12-03-2023',
        estado: 'Vigente',
        descripcion: 'Completado'
      },
      {
        id: 2,
        operacion: 'Reprogramación',
        funcionario: 'Ximena Luján',
        fecha: '14-01-2023',
        estado: 'Vigente',
        descripcion: 'Completado'
      }
    ]
  }

  getReprogramacion(id: number = 13): Reprogramacion {
    return {
      funcionario: {
        id: 85255,
        ci: '12345678',
        nombre: 'Carlos Eduardo Chuvé Luján',
      },
      hora: '16:25',
      fechaOperacion: '13-03-2023',
      fechaReprogramacion: '23-03-2023',
      documento: 'Fotocopia Legalizada de título',
      descripcion: 'Problemas de revisión'
    }
  }

  getDocumentosRequeridos(): Requerido[] {
    return [
      {
        id: 1,
        documento: 'Certificado de notas de universidad de origen',
        cantidad: 2,
        estado: 'Devuelto'
      },
      {
        id: 2,
        documento: 'Programas Analiticos de materias a convalidar',
        cantidad: 1,
        estado: 'Pendiente'
      },
      {
        id: 3,
        documento: 'Plan de estudios de universidad de origen',
        cantidad: 1,
        estado: 'Completado'
      },
      {
        id: 4,
        documento: 'Resolución Ministerial de la carrera en universidad de origen',
        cantidad: 1,
        estado: 'En Proceso'
      }
    ];
  }


  async GetInscripcions(idpersona: any) {
    let ans: any = await this.MainService.get(`${environment.endPoint}Inscripcion/${idpersona}`);
    return ans;
  }

  async GetListTramites(idtramite: any) {
    let ans: any = await this.MainService.get(`${environment.endPoint}Tramite/${idtramite}`);
    console.log(ans);
    
    return ans;
  }
}
