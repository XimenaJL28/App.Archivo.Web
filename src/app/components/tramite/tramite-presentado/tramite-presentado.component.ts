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

  getDiasFaltantes(documento: DocumentoInscripcionCarrera): number {
    const fechaActual = new Date();
    return 13;
    //return documento.fechaLimitedeEntrega() - fechaActual();
  }
}
