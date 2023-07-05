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

  async GetListDocumentos(idtramite: any = '') {
    const url = `${environment.endPoint}Archivos/ListaDocumentoTramite?TramiteInscripcionCarreraId=${idtramite}`;
    // const url = 'http://localhost:3000/documentoInscripcionCarreras';
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
    //const url = `${environment.endPoint}Tramite/${idtramite}`;
    const url = 'http://localhost:3000/tramite';
    let ans: any = await this.MainService.get(url);
    return ans;
  }

  async GetListTramiteSubTipo(id: any = '0') {
    //const url = `${environment.endPoint}Tramite/${idtramite}`;
    const url = `http://localhost:3000/tramiteSupTipos`;
    let ans: any = await this.MainService.get(url);
    return ans;
  }

  async GetListDocumentoFaltante(tramiteInscripcionCarreraId: any = '0') {
    //const url = `${environment.endPoint}Tramite/${idtramite}`;
    const url = `http://localhost:3000/tramiteSupTipos`;
    let ans: any = await this.MainService.get(url);
    return ans;
  }
}
