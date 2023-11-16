import { Component, Input } from '@angular/core';

import { DocumentoInscripcionCarrera } from '../../../interfaces/estudiante.interface';
import { setColorDocumentoEstado } from '../../../utils/color';

@Component({
  selector: 'app-tramite-presentado',
  templateUrl: './tramite-presentado.component.html',
  styleUrls: ['./tramite-presentado.component.scss']
})
export class TramitePresentadoComponent {
  @Input() documentos: DocumentoInscripcionCarrera[] = [];

  constructor() { }

  getColorDocumentoEstado(documento: DocumentoInscripcionCarrera): string {
    return setColorDocumentoEstado(documento);
  }

  //Contador dias faltantes 
  getDiasFaltantes(documento: DocumentoInscripcionCarrera): string {
    const fechaLimite = new Date(documento.fechaLimitedeEntrega).getTime();
    const fechaActual = new Date().getTime();
    if (!fechaLimite || !fechaActual){
      return ''
    }
    return Math.round((fechaLimite - fechaActual) / (1000 * 60 * 60 * 24)).toString();
  }
}
