import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TramiteService {

  constructor(private readonly MainService: MainService) { }

  async GetInscripcions(idpersona: any) {
    const url = `${environment.endPoint}Archivos/ListaInscripciones?IdEstudiante=${idpersona}`;
    //const url = 'http://localhost:3000/inscripciones'
    let ans: any = await this.MainService.get(url);
    return ans;
  }

  async GetListTramites(idtramite: any) {
    const url = `${environment.endPoint}Archivos/ListaTramites?IdInscripcion=${idtramite}`;
    //const url = 'http://localhost:3000/tramitesinscripcion';
    let ans: any = await this.MainService.get(url);
    return ans;
  }

  async GetListDocumentos(TramiteInscripcionCarreraId: number = 0, tramitesubtipoId: number = 0) {
    const url = `${environment.endPoint}Archivos/ListaDocumentoTramite?TramiteInscripcionCarreraId=${TramiteInscripcionCarreraId}&tramitesubtipoId=${tramitesubtipoId}`;
    let ans: any = await this.MainService.get(url);
    return ans;
  }

  async GetListOperaciones(idtramite: any = '') {
    const url = `${environment.endPoint}Operacion/ListaOperacionInscripcion?idDocumentoInscripcion=${idtramite}`;
    // const url = 'http://localhost:3000/documentoOperaciones';
    let ans: any = await this.MainService.get(url);
    return ans;
  }

  async GetListOperacion(id: any = '0') {
    const url = `${environment.endPoint}Operacion/Agregaroperacion`;
    // const url = `http://localhost:3000/documentoOperaciones/${id}`;
    let ans: any = await this.MainService.get(url);
    return ans;
  }

  async GetListTramiteUniversidad() {
    const url = `${environment.endPoint}Plantilla/ListaTramites`;
    let ans: any = await this.MainService.get(url);
    return ans;
  }

  async GetListTramiteSubTipo(tramiteId: number = 0) {
    const url = `${environment.endPoint}Plantilla/ListaSubtramites?Idtramite=${tramiteId}`;
    let ans: any = await this.MainService.get(url);

    const tramiteSubTipos: any[] = ans || [];

    const responseData: any[] = [];
    tramiteSubTipos.map(tramiteSubtipo => {
      console.log(tramiteSubtipo);
      const url = `${environment.endPoint}Plantilla/ListaDocumentos?IdtramiteSubtipo=${tramiteSubtipo.tramiteSubTipoId}`;
      this.MainService.get(url)
        .then((plantilla: any) => {
          const plantillas = plantilla || [];
          console.log(plantillas);
          responseData.push({
            tramiteSubTipo: tramiteSubtipo,
            documentoPlantillas: plantillas,
          });
        })
    });

    console.log(responseData);
    return responseData;
  }

  async GetDocumentoOperacionTipoSelected() {
    const url = `${environment.endPoint}Operacion/ListaDeoperaciontipo`;
    let ans: any = await this.MainService.get(url);
    const response = (ans || []) as any[];

    return response.map((item) => {
      return {
        id: item.documentoOpeacionTipoId,
        nombre: item.nombre
      }
    })
  }

  async PostDocumentoOperacion(operacion: any) {
    const url = `${environment.endPoint}Operacion/Agregaroperacion`;
    let ans: any = await this.MainService.post(url, operacion);
    return ans;
  }

  async PostDocumentoInscripcionCarrera(documento: any) {
    const url = `${environment.endPoint}Archivos/AgregarDocumentoInscripcion`;
    let ans: any = await this.MainService.post(url, documento);
    return ans;
  }

  async GetListDocumentoPlantilla(tramiteSubTipoId: number = 0) {
    const url = `${environment.endPoint}Plantilla/ListaDocumentos?IdtramiteSubtipo=${tramiteSubTipoId}`;
    let ans: any = await this.MainService.get(url);
    return ans;
  }

  async GetListDocumentoFaltante(idTramiteInscripcionCarrera: number = 0, idtramitesubtipo: number = 0) {
    const url = `${environment.endPoint}Archivos/ListaDocumentosfaltantes?idTramiteInscripcionCarrera=${idTramiteInscripcionCarrera}&idtramitesubtipo=${idtramitesubtipo}`;
    let ans: any = await this.MainService.get(url);
    return ans;
  }

  async GetListTramiteSubTipoSelected() {
    const url = `${environment.endPoint}Plantilla/ListaSubtramites?Idtramite=2`;
    const ans = await this.MainService.get(url);
    const response = (ans || []) as any[];

    return response.map((item) => {
      return {
        id: item.tramiteSubTipoId,
        nombre: item.nombreSubtramite
      }
    })
  }

  async GetListDocumentoEstadoSelected() {
    const url = `${environment.endPoint}Plantilla/ListDocumentoEstado`;
    const ans = await this.MainService.get(url);
    const response = (ans || []) as any[];

    return response.map((item) => {
      return {
        id: item.documentoEstadoId,
        nombre: item.nombre
      }
    })
  }

  async GetListDocumentoTipoSelected() {
    const url = `${environment.endPoint}Plantilla/ListaSubtramites?Idtramite=2`;
    const ans = await this.MainService.get(url);
    const response = (ans || []) as any[];

    return response.map((item) => {
      return {
        id: item.tramiteSubTipoId,
        nombre: item.nombreSubtramite
      }
    })
  }
}