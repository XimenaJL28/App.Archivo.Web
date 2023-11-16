import { Component, EventEmitter, Input, Output } from '@angular/core';

import { EstudianteService } from '../../../services/estudiante.service';

import { Persona } from '../../../interfaces/estudiante.interface';
import { MainService } from '../../../services/main.service';

@Component({
  selector: 'app-estudiante-search',
  templateUrl: './estudiante-search.component.html',
  styleUrls: ['./estudiante-search.component.scss']
})
export class EstudianteSearchComponent {
  @Output() getEstudianteSeleccionado: EventEmitter<Persona> = new EventEmitter();
  @Input() canView: boolean = false;

  public estudianteEncontrados: Persona[] = [];

  constructor(
    private readonly estudianteService: EstudianteService,
    private readonly MainService: MainService
  ) { }

  // Metodo Busqueda Estudiante por nombre o carné
  async buscarEstudiante(event: any) {
    const textSearch = event.query.trim() as string;
    if (textSearch.length === 0) {
      return;
    }

    const response = await this.estudianteService.buscarEstudiante(textSearch);
    this.estudianteEncontrados = response || [];
  }

  setEstudianteSeleccionado(persona: Persona): void {
    this.getEstudianteSeleccionado.emit(persona);
  }

  permisoTipo(idinterfaz: number, IdTarea: number) {
    // return this.interfaz.tareas.filter((x: any) => x.id == IdTarea).length > 0 ? true : false;
    return this.MainService.verificarPermisos(idinterfaz, IdTarea);
  }
}
