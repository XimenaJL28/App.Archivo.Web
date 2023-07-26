import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DocumentoInscripcionCarrera } from '../../../interfaces/estudiante.interface';
import { DocumentoOperacion } from '../../../interfaces/tramite.interface';

@Component({
  selector: 'app-documento-operaciones',
  templateUrl: './documento-operaciones.component.html',
  styleUrls: ['./documento-operaciones.component.scss']
})
export class DocumentoOperacionesComponent {
  @Input() operaciones: DocumentoOperacion[] = [];
  @Input() documento?: DocumentoInscripcionCarrera = undefined;
  @Output() getOperacionSeleccionada: EventEmitter<DocumentoOperacion> = new EventEmitter();
  @Output() getNuevaOperacion: EventEmitter<void> = new EventEmitter();

  public operacion?: DocumentoOperacion = undefined;

  constructor() { }

  setOperacion(operacion: DocumentoOperacion): void {
    this.getOperacionSeleccionada.emit(operacion);
  }

  setNuevaOperacion(): void {
    this.getNuevaOperacion.emit();
  }
}
