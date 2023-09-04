import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { DocumentoTipo, DocumentoRespaldo } from '../interfaces/tramite.interface';

import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentoTipoService {

  constructor(private readonly mainService: MainService) { }

  // async getListDocumentoTipos() {
  //   const url = `${environment.endPoint}Plantilla/ListaTipoDocumentos`;
  //   const ans = await this.mainService.get<DocumentoTipo[]>(url);
  //   return ans;
  // }
  async getListDocumentoTipos() {
    const ans: any = await this.mainService.get(`${environment.endPoint}Plantilla/ListaTipoDocumentos`);
    return ans;
  }

  async postDocumentoTipo(documentoTipo: DocumentoTipo) {
    const url = `${environment.endPoint}/Plantilla/AgregarTipoDocumento`;
    let ans = await this.mainService.post<DocumentoTipo>(url, documentoTipo);
    return ans;
  }

  async putDocumentoTipo(documentoTipo: any) {
    const url = `${environment.endPoint}/Plantilla/UpdateDocumentoRespaldo`;
    let ans = await this.mainService.put(url, documentoTipo);
    return ans;
  }

  async putEstadoExpiracionDocumentoTipo(documentoTipo: any) {
    const url = `${environment.endPoint}/Plantilla/UpdateEstadoExpiracion`;
    let ans = await this.mainService.put(url, documentoTipo);
    return ans;
  }
}
