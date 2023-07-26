import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Inscripcion } from '../../../interfaces/estudiante.interface';

@Component({
  selector: 'app-estudiante-inscripciones',
  templateUrl: './estudiante-inscripciones.component.html',
  styleUrls: ['./estudiante-inscripciones.component.scss']
})
export class EstudianteInscripcionesComponent {
  @Input() inscripciones: Inscripcion[] = [];
  @Input() inscripcion?: Inscripcion = undefined;
  @Output() getInscripcionSeleccionada: EventEmitter<Inscripcion> = new EventEmitter();

  constructor() { }

  setInscripcionSeleccionada(inscripcion: Inscripcion): void {
    this.getInscripcionSeleccionada.emit(inscripcion);
  }
}
