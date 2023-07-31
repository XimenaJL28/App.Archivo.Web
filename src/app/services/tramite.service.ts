import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { DocumentoInscripcionCarrera, DocumentoInscripcionCarreraFaltantes, DocumentoInscripcionCarreraSave, DocumentoInscripcionCarreraUpdate, DropDownItem, Inscripcion, TramiteInscripcionCarrera } from '../interfaces/estudiante.interface';
import { Tramite, TramiteSubTipo, DocumentoPlantilla, TramiteSubTipoDocumentoPlantillas, DocumentoOperacion, DocumentoOperacionSave, UnidadAcademica } from '../interfaces/tramite.interface';

import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class TramiteService {
  constructor(private readonly mainService: MainService) { }

  // Datos de estudiante
  async getInscripciones(personaId: number) {
    const url = `${environment.endPoint}Archivos/ListaInscripciones?IdEstudiante=${personaId}`;
    let ans = await this.mainService.get<Inscripcion[]>(url);
    return ans;
  }

  async getListTramites(inscripcionId: number) {
    const url = `${environment.endPoint}Archivos/ListaTramites?IdInscripcion=${inscripcionId}`;
    let ans = await this.mainService.get<TramiteInscripcionCarrera[]>(url);
    return ans;
  }

  async getListDocumentos(tramiteInscripcionCarreraId: number, tramiteSubTipoId: number) {
    const url = `${environment.endPoint}Archivos/ListaDocumentoTramite?TramiteInscripcionCarreraId=${tramiteInscripcionCarreraId}&tramitesubtipoId=${tramiteSubTipoId}`;
    let ans = await this.mainService.get<DocumentoInscripcionCarrera[]>(url);
    return ans;
  }

  async getListDocumentoFaltante(tramiteInscripcionCarreraId: number, tramiteSubTipoId: number) {
    const url = `${environment.endPoint}Archivos/ListaDocumentosfaltantes?idTramiteInscripcionCarrera=${tramiteInscripcionCarreraId}&idtramitesubtipo=${tramiteSubTipoId}`;
    let ans = await this.mainService.get<DocumentoInscripcionCarreraFaltantes[]>(url);
    return ans;
  }
  // Datos de estudiante

  // CRUD Documentos
  async postDocumentoInscripcionCarrera(documento: DocumentoInscripcionCarreraSave) {
    const url = `${environment.endPoint}Archivos/AgregarDocumentoInscripcion`;
    let ans = await this.mainService.post<DocumentoInscripcionCarreraSave>(url, documento);
    return ans;
  }

  async putDocumentoInscripcionCarrera(documento: DocumentoInscripcionCarreraUpdate) {
    const url = `${environment.endPoint}Archivos/ActualizarDocInscripcion`;
    let ans = await this.mainService.put<DocumentoInscripcionCarreraSave>(url, documento);
    return ans;
  }
  // CRUD Documentos

  // CRUD Operaciones
  async postDocumentoOperacion(operacion: DocumentoOperacionSave) {
    const url = `${environment.endPoint}Operacion/Agregaroperacion`;
    let ans = await this.mainService.post<DocumentoOperacion>(url, operacion);
    return ans;
  }

  async getListOperaciones(documentoInscripcionCarreraId: number) {
    const url = `${environment.endPoint}Operacion/ListaOperacionInscripcion?idDocumentoInscripcion=${documentoInscripcionCarreraId}`;
    let ans = await this.mainService.get<DocumentoOperacion[]>(url);
    return ans;
  }
  // CRUD Operaciones

  // CRUD Tramites
  async getListTramiteUniversidad(unidadAcademicaId: number) {
    const url = `${environment.endPoint}Plantilla/ListaTramites?UnidadAcademicaId=${unidadAcademicaId}`;
    let ans = await this.mainService.get<Tramite[]>(url);
    return ans;
  }

  async getListUnidadAcademica() {
    const url = `${environment.endPoint}Plantilla/ListaUnidadAcademica`;
    let ans = await this.mainService.get<UnidadAcademica[]>(url);
    return ans;
  }

  async getListTramiteSubTipo(tramiteId: number) {
    const url = `${environment.endPoint}Plantilla/ListaSubtramites?Idtramite=${tramiteId}`;
    let ans = await this.mainService.get<TramiteSubTipo[]>(url);

    const tramiteSubTipos: TramiteSubTipo[] = ans || [];

    const responseData: TramiteSubTipoDocumentoPlantillas[] = [];
    tramiteSubTipos.map(tramiteSubtipo => {
      const url = `${environment.endPoint}Plantilla/ListaDocumentos?IdtramiteSubtipo=${tramiteSubtipo.tramiteSubTipoId}`;
      this.mainService.get<DocumentoPlantilla[]>(url)
        .then((plantilla: any) => {
          const plantillas = plantilla || [];
          responseData.push({
            ...tramiteSubtipo,
            documentoPlantillas: plantillas,
          });
        })
    });

    return responseData;
  }
  // CRUD Tramites

  // DropDown para formularios
  async getDropDownTramiteSubTipo(): Promise<DropDownItem[]> {
    const url = `${environment.endPoint}Plantilla/ListaSubtramites?Idtramite=2`;
    const ans = await this.mainService.get(url);
    const response = (ans || []) as any[];

    if (response.length == 0) {
      return response as DropDownItem[];
    }

    return response.map((item) => {
      return {
        id: item.tramiteSubTipoId,
        nombre: item.nombreSubtramite
      }
    })
  }

  async getDropDownDocumentoOperacionTipo(): Promise<DropDownItem[]> {
    const url = `${environment.endPoint}Operacion/ListaDeoperaciontipo`;
    let ans: any = await this.mainService.get(url);
    const response = (ans || []) as any[];

    if (response.length == 0) {
      return response as DropDownItem[];
    }

    return response.map((item) => {
      return {
        id: item.documentoOpeacionTipoId,
        nombre: item.nombre
      }
    })
  }

  async getDropDownDocumentoEstado(): Promise<DropDownItem[]> {
    const url = `${environment.endPoint}Plantilla/ListDocumentoEstado`;
    const ans = await this.mainService.get(url);
    const response = (ans || []) as any[];

    if (response.length == 0) {
      return response as DropDownItem[];
    }

    return response.map((item) => {
      return {
        id: item.documentoEstadoId,
        nombre: item.nombre
      }
    })
  }

  async getDropDownDocumentoTipo(): Promise<DropDownItem[]> {
    const url = `${environment.endPoint}Plantilla/ListaSubtramites?Idtramite=2`;
    const ans = await this.mainService.get(url);
    const response = (ans || []) as any[];

    if (response.length == 0) {
      return response as DropDownItem[];
    }

    return response.map((item) => {
      return {
        id: item.tramiteSubTipoId,
        nombre: item.nombreSubtramite
      }
    })
  }

  async getDropDownDocumentoPlantillaEstado(): Promise<DropDownItem[]> {
    const url = `${environment.endPoint}Plantilla/ListaSubtramites?Idtramite=2`;
    const ans = await this.mainService.get(url);
    const response = (ans || []) as any[];

    if (response.length == 0) {
      return response as DropDownItem[];
    }

    return response.map((item) => {
      return {
        id: item.tramiteSubTipoId,
        nombre: item.nombreSubtramite
      }
    })
  }

  async getDropDownCarrera(): Promise<DropDownItem[]> {
    const url = `${environment.endPoint}Plantilla/ListaSubtramites?Idtramite=2`;
    const ans = await this.mainService.get(url);
    const response = (ans || []) as any[];

    if (response.length == 0) {
      return response as DropDownItem[];
    }

    return response.map((item) => {
      return {
        id: item.tramiteSubTipoId,
        nombre: item.nombreSubtramite
      }
    })
  }
  // DropDown para formularios
}
