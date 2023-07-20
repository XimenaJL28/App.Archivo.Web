import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class TramiteService {
  constructor(private readonly mainService: MainService) { }

  // Datos de estudiante
  async getInscripciones(personaId: number) {
    //const url = `${environment.endPoint}/inscripciones`;
    const url = `${environment.endPoint}Archivos/ListaInscripciones?IdEstudiante=${personaId}`;
    let ans: any = await this.mainService.get(url);
    return ans;
  }

  async getListTramites(inscripcionId: number) {
    //const url = `${environment.endPoint}/tramiteInscripcionCarreras`;
    const url = `${environment.endPoint}Archivos/ListaTramites?IdInscripcion=${inscripcionId}`;
    let ans: any = await this.mainService.get(url);
    return ans;
  }

  async getListDocumentos(tramiteInscripcionCarreraId: number, tramiteSubTipoId: number) {
    //const url = `${environment.endPoint}/documentoInscripcionCarreras`;
    const url = `${environment.endPoint}Archivos/ListaDocumentoTramite?TramiteInscripcionCarreraId=${tramiteInscripcionCarreraId}&tramitesubtipoId=${tramiteSubTipoId}`;
    let ans: any = await this.mainService.get(url);
    return ans;
  }

  async getListDocumentoFaltante(tramiteInscripcionCarreraId: number, tramiteSubTipoId: number) {
    //const url = `${environment.endPoint}/documentoInscripcionCarreras`;
    const url = `${environment.endPoint}Archivos/ListaDocumentosfaltantes?idTramiteInscripcionCarrera=${tramiteInscripcionCarreraId}&idtramitesubtipo=${tramiteSubTipoId}`;
    let ans: any = await this.mainService.get(url);
    return ans;
  }
  // Datos de estudiante

  // CRUD Documentos
  async postDocumentoInscripcionCarrera(documento: any) {
    const url = `${environment.endPoint}Archivos/AgregarDocumentoInscripcion`;
    let ans: any = await this.mainService.post(url, documento);
    return ans;
  }

  async putDocumentoInscripcionCarrera(documento: any) {
    const url = `${environment.endPoint}Archivos/ActualizarDocInscripcion`;
    let ans: any = await this.mainService.put(url, documento);
    console.log(ans, "servicePut")
    return ans;
  }
  // CRUD Documentos

  // CRUD Operaciones
  async postDocumentoOperacion(operacion: any) {
    const url = `${environment.endPoint}Operacion/Agregaroperacion`;
    let ans: any = await this.mainService.post(url, operacion);
    return ans;
  }

  async getListOperaciones(documentoInscripcionCarreraId: number) {
    //const url = `${environment.endPoint}/documentoOperaciones`;
    const url = `${environment.endPoint}Operacion/ListaOperacionInscripcion?idDocumentoInscripcion=${documentoInscripcionCarreraId}`;
    let ans: any = await this.mainService.get(url);
    return ans;
  }
  // CRUD Operaciones

  // CRUD Tramites
  async getListTramiteUniversidad() {
    //const url = `${environment.endPoint}/tramite`;
    const url = `${environment.endPoint}Plantilla/ListaTramites`;
    let ans: any = await this.mainService.get(url);
    return ans;
  }

  async getListTramiteSubTipo(tramiteId: number) {
    //const url = `${environment.endPoint}/tramiteSupTipos`;
    const url = `${environment.endPoint}Plantilla/ListaSubtramites?Idtramite=${tramiteId}`;
    let ans: any = await this.mainService.get(url);

    const tramiteSubTipos: any[] = ans || [];

    const responseData: any[] = [];
    tramiteSubTipos.map(tramiteSubtipo => {
      //const url = `${environment.endPoint}/documentoPlantillas`;
      const url = `${environment.endPoint}Plantilla/ListaDocumentos?IdtramiteSubtipo=${tramiteSubtipo.tramiteSubTipoId}`;
      this.mainService.get(url)
        .then((plantilla: any) => {
          const plantillas = plantilla || [];
          responseData.push({
            tramiteSubTipo: tramiteSubtipo,
            documentoPlantillas: plantillas,
          });
        })
    });

    return responseData;
  }
  // CRUD Tramites

  // DropDown para formularios
  async getListTramiteSubTipoSelected() {
    //const url = `${environment.endPoint}/tramiteSupTipos`;
    const url = `${environment.endPoint}Plantilla/ListaSubtramites?Idtramite=2`;
    const ans = await this.mainService.get(url);
    const response = (ans || []) as any[];

    return response.map((item) => {
      return {
        id: item.tramiteSubTipoId,
        nombre: item.nombreSubtramite
      }
    })
  }

  async getDocumentoOperacionTipoSelected() {
    //const url = `${environment.endPoint}/documentoOperacionTipos`;
    const url = `${environment.endPoint}Operacion/ListaDeoperaciontipo`;
    let ans: any = await this.mainService.get(url);
    const response = (ans || []) as any[];

    return response.map((item) => {
      return {
        id: item.documentoOpeacionTipoId,
        nombre: item.nombre
      }
    })
  }

  async getListDocumentoEstadoSelected() {
    //const url = `${environment.endPoint}/documentoEstados`;
    const url = `${environment.endPoint}Plantilla/ListDocumentoEstado`;
    const ans = await this.mainService.get(url);
    const response = (ans || []) as any[];

    return response.map((item) => {
      return {
        id: item.documentoEstadoId,
        nombre: item.nombre
      }
    })
  }

  async getListDocumentoTipoSelected() {
    //const url = `${environment.endPoint}/documentoTipo`;
    const url = `${environment.endPoint}Plantilla/ListaSubtramites?Idtramite=2`;
    const ans = await this.mainService.get(url);
    const response = (ans || []) as any[];

    return response.map((item) => {
      return {
        id: item.tramiteSubTipoId,
        nombre: item.nombreSubtramite
      }
    })
  }

  async getListDocumentoPlantillaEstadoSelected() {
    //const url = `${environment.endPoint}/documentoPlantillaEstados`;
    const url = `${environment.endPoint}Plantilla/ListaSubtramites?Idtramite=2`;
    const ans = await this.mainService.get(url);
    const response = (ans || []) as any[];

    return response.map((item) => {
      return {
        id: item.tramiteSubTipoId,
        nombre: item.nombreSubtramite
      }
    })
  }

  async getListCarreraSelected() {
    //const url = `${environment.endPoint}/carreras`;
    const url = `${environment.endPoint}Plantilla/ListaSubtramites?Idtramite=2`;
    const ans = await this.mainService.get(url);
    const response = (ans || []) as any[];

    return response.map((item) => {
      return {
        id: item.tramiteSubTipoId,
        nombre: item.nombreSubtramite
      }
    })
  }
  // DropDown para formularios
}
