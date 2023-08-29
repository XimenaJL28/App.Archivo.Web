import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Inscripcion } from '../../../interfaces/estudiante.interface';
import { MainService } from '../../../services/main.service';

@Component({
  selector: 'app-estudiante-inscripciones',
  templateUrl: './estudiante-inscripciones.component.html',
  styleUrls: ['./estudiante-inscripciones.component.scss']
})
export class EstudianteInscripcionesComponent {
  @Input() inscripciones: Inscripcion[] = [];
  @Input() inscripcion?: Inscripcion = undefined;
  @Output() getInscripcionSeleccionada: EventEmitter<Inscripcion> = new EventEmitter();
  interfaz: any;

  constructor(private readonly MainService: MainService) {
    this.interfaz = this.MainService.interfaces.filter((x: any) => x.id == 41006)[0];

  }

  setInscripcionSeleccionada(inscripcion: Inscripcion): void {
    this.getInscripcionSeleccionada.emit(inscripcion);
  }
  permisoTipo(IdTarea: number) {
    return this.interfaz.tareas.filter((x: any) => x.id == IdTarea).length > 0 ? true : false;
  }
}
