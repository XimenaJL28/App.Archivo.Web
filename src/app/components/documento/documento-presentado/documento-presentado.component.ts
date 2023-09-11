import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DocumentoInscripcionCarrera } from '../../../interfaces/estudiante.interface';

import { setColorDocumentoEstado } from '../../../utils/color';
import { MainService } from '../../../services/main.service';

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

  constructor(private readonly MainService: MainService) { }

  setDocumentoSeleccionado(documentoInscripcioncarreraId: DocumentoInscripcionCarrera, update = false): void {
    this.getDocumentoSeleccionado.emit({ documento: documentoInscripcioncarreraId, update: update });
  }

  getColorDocumentoEstado(documento: DocumentoInscripcionCarrera): string {
    return setColorDocumentoEstado(documento);
  }

  permisoTipo(idinterfaz: number, IdTarea: number) {
    // return this.interfaz.tareas.filter((x: any) => x.id == IdTarea).length > 0 ? true : false;
    return this.MainService.verificarPermisos(idinterfaz, IdTarea);
  }
}
