import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Permiso, PermisoUsuario } from '../interfaces/permiso.interface';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor(private readonly mainService: MainService) { }

  async getPermisos() {
    //return [];
    const sistemaId = 34003;
    const ans = await this.mainService.get<Permiso[]>(`${environment.urlAccess}Accesos/InterfacesTareas/${sistemaId}`);
    console.log(ans, 'permisos de usuario');
    return ans;
  }

  /*async getPermiso(rol: string) {
    const url = `${environment.endPoint}/personas`;
    //const url = `${environment.endPoint}Archivos/BuscarPersona?text=${criterio}`;
    let ans = await this.mainService.get<PermisoUsuario>(url);
    return ans;
    return [
      {
        "id": 36006,
        "tareas": [
          {
            "id": 51200,
            "tipo": 2
          }
        ]
      },
      {
        "id": 36007,
        "tareas": [
          {
            "id": 51201,
            "tipo": 2
          }
        ]
      },
      {
        "id": 36010,
        "tareas": [
          {
            "id": 51202,
            "tipo": 2
          },
          {
            "id": 51203,
            "tipo": 3
          }
        ]
      },
      {
        "id": 36008,
        "tareas": [
          {
            "id": 51204,
            "tipo": 2
          },
          {
            "id": 51205,
            "tipo": 3
          }
        ]
      },
      {
        "id": 36009,
        "tareas": [
          {
            "id": 51206,
            "tipo": 2
          }
        ]
      }
    ]
  }*/

  /*return [
      {
        "id": 41006,
        "titulo": "Estudiante",
        "descripcion": "IU de Estudiante",
        "ubicacion": "/Estudiante",
        "enlaceTutorial": "fa-solid fa-user",
        "tipo": 1,
        "idModulo": 34003,
        "icono": "",
        "estado": true,
        "tareas": [
          {
            "id": 51200,
            "nombre": "Ver",
            "descripcion": "Ver información del estudiante",
            "idInterface": 41006,
            "tipo": 2
          }
        ]
      },
      {
        "id": 41007,
        "titulo": "Tramite",
        "descripcion": "IU de Tramite",
        "ubicacion": "/Tramite",
        "enlaceTutorial": "fa-solid fa-file-lines",
        "tipo": 1,
        "idModulo": 34003,
        "icono": "",
        "estado": true,
        "tareas": [
          {
            "id": 51201,
            "nombre": "Ver",
            "descripcion": "Ver información de trámite",
            "idInterface": 41007,
            "tipo": 2
          }
        ]
      },
      {
        "id": 41008,
        "titulo": "Documento",
        "descripcion": "IU de Documento",
        "ubicacion": "/Documento",
        "enlaceTutorial": "fa-solid fa-file",
        "tipo": 1,
        "idModulo": 34003,
        "icono": "",
        "estado": true,
        "tareas": [
          {
            "id": 51202,
            "nombre": "Ver",
            "descripcion": "Ver información de documento",
            "idInterface": 36010,
            "tipo": 2
          },
          {
            "id": 51203,
            "nombre": "Editar",
            "descripcion": "Editar información de documento",
            "idInterface": 36010,
            "tipo": 3
          }
        ]
      },
      {
        "id": 41008,
        "titulo": "Plantilla",
        "descripcion": "IU de Plantilla",
        "ubicacion": "/Plantilla",
        "enlaceTutorial": "fa-solid fa-clipboard-list",
        "tipo": 1,
        "idModulo": 34003,
        "icono": "",
        "estado": true,
        "tareas": [
          {
            "id": 51204,
            "nombre": "Ver",
            "descripcion": "Ver información de plantilla",
            "idInterface": 41008,
            "tipo": 2
          },
          {
            "id": 51205,
            "nombre": "Editar",
            "descripcion": "Editar información de plantilla",
            "idInterface": 41008,
            "tipo": 3
          }
        ]
      },
      {
        "id": 41009,
        "titulo": "Operacion",
        "descripcion": "IU de Operacion",
        "ubicacion": "/Operacion",
        "enlaceTutorial": "fa-solid fa-gear",
        "tipo": 1,
        "idModulo": 34003,
        "icono": "",
        "estado": true,
        "tareas": [
          {
            "id": 51206,
            "nombre": "Ver",
            "descripcion": "Ver información de una operación",
            "idInterface": 36009,
            "tipo": 2
          }
        ]
      }
    ];*/
}
