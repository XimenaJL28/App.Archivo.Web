import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Inscripcion } from '../../../interfaces/estudiante.interface';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-estudiante-inscripciones',
  templateUrl: './estudiante-inscripciones.component.html',
  styleUrls: ['./estudiante-inscripciones.component.scss']
})
export class EstudianteInscripcionesComponent {
  @Input() inscripciones: Inscripcion[] = [];
  @Input() inscripcion?: Inscripcion = undefined;
  @Input() canView: boolean = false;
  @Output() getInscripcionSeleccionada: EventEmitter<Inscripcion> = new EventEmitter();
  constructor(

    private readonly MainService: MainService
  ) { }

  setInscripcionSeleccionada(inscripcion: Inscripcion): void {
    this.getInscripcionSeleccionada.emit(inscripcion);
  }
  permisoTipo(idinterfaz: number, IdTarea: number) {
    // return this.interfaz.tareas.filter((x: any) => x.id == IdTarea).length > 0 ? true : false;
    return this.MainService.verificarPermisos(idinterfaz, IdTarea);
  }
}
