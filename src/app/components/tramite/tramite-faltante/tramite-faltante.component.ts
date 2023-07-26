import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DocumentoInscripcionCarreraFaltantes } from '../../../interfaces/estudiante.interface';

@Component({
  selector: 'app-tramite-faltante',
  templateUrl: './tramite-faltante.component.html',
  styleUrls: ['./tramite-faltante.component.scss']
})
export class TramiteFaltanteComponent {
  @Input() documentosFaltantes: DocumentoInscripcionCarreraFaltantes[] = [];
  @Output() getDocumentoSeleccionado: EventEmitter<DocumentoInscripcionCarreraFaltantes> = new EventEmitter();

  constructor() { }

  setDocumentoFaltante(documento: DocumentoInscripcionCarreraFaltantes): void {
    this.getDocumentoSeleccionado.emit(documento);
  }
}
