import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DocumentoInscripcionCarrera } from '../../../interfaces/estudiante.interface';

import { setColorDocumentoEstado } from '../../../utils/color';
import { MainService } from '../../../services/main.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-documento-presentado',
  templateUrl: './documento-presentado.component.html',
  styleUrls: ['./documento-presentado.component.scss']
})
export class DocumentoPresentadoComponent {
  @Input() documentos: DocumentoInscripcionCarrera[] = [];
  @Input() documento?: DocumentoInscripcionCarrera = undefined;

  @Output() getDocumentoSeleccionado: EventEmitter<{ documento: DocumentoInscripcionCarrera, update: boolean }> = new EventEmitter();
  public visibleOperacionForm: boolean = false;
  interface: any;

  constructor(private readonly MainService: MainService,
    private messageService: MessageService) {
    this.interface = this.MainService.interfaces.filter((x: any) => x.id == 41006)[0];
  }

  setDocumentoSeleccionado(documentoInscripcioncarreraId: DocumentoInscripcionCarrera, update = false): void {
    this.getDocumentoSeleccionado.emit({ documento: documentoInscripcioncarreraId, update: update });
  }

  getColorDocumentoEstado(documento: DocumentoInscripcionCarrera): string {
    return setColorDocumentoEstado(documento);
  }

  setVisibleOperacion() {
    this.visibleOperacionForm = true;
  }

  permiso(idTarea: number) {
    return this.interface.tareas.filter((x: any) => x.id == idTarea).length > 0 ? true : false;
  }

  getTarea() {
    this.messageService.add({ severity: 'error', summary: 'No tiene muñeca', detail: 'No cuenta con permiso para acceder' });
    console.log('No tiene muñeca');

  }

}
