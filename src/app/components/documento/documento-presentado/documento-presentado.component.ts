import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DocumentoInscripcionCarrera } from '../../../interfaces/estudiante.interface';

import { setColorDocumentoEstado } from '../../../utils/color';

@Component({
  selector: 'app-documento-presentado',
  templateUrl: './documento-presentado.component.html',
  styleUrls: ['./documento-presentado.component.scss']
})
export class DocumentoPresentadoComponent {
  @Input() canViewOperacion: boolean = false;
  @Input() canEditDocumento: boolean = false;

  @Input() documentos: DocumentoInscripcionCarrera[] = [];
  @Input() documento?: DocumentoInscripcionCarrera = undefined;
  @Output() getDocumentoSeleccionado: EventEmitter<{
    documento: DocumentoInscripcionCarrera,
    update: boolean
  }> = new EventEmitter();

  constructor() { }

  setDocumentoSeleccionado(documentoInscripcioncarreraId: DocumentoInscripcionCarrera, update = false): void {
    this.getDocumentoSeleccionado.emit({ documento: documentoInscripcioncarreraId, update: update });
  }

  getColorDocumentoEstado(documento: DocumentoInscripcionCarrera): string {
    return setColorDocumentoEstado(documento);
  }
}
