import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { TramiteInscripcionCarrera, TramitesRealizados } from '../../../interfaces/estudiante.interface';

@Component({
  selector: 'app-estudiante-tramites',
  templateUrl: './estudiante-tramites.component.html',
  styleUrls: ['./estudiante-tramites.component.scss']
})
export class EstudianteTramitesComponent {
  @Input() tramites!: TramitesRealizados[] ;
  @Input() tramite?: TramiteInscripcionCarrera = undefined;
  @Input() tramiteActiveIndex: number = 0;
  @Output() getTramiteSeleccionado: EventEmitter<{ tramite: TramiteInscripcionCarrera, index: number }> = new EventEmitter();
  haytramites : boolean = false;

  constructor() { }

  OnInit(): void {
}

  
  setTramiteSeleccionado(tramite: TramiteInscripcionCarrera, index: number): void {
    this.getTramiteSeleccionado.emit({ tramite, index });    
  }
}
