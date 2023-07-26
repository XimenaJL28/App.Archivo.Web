import { Component, Input } from '@angular/core';

import { Inscripcion, Persona, TramiteInscripcionCarrera } from '../../../interfaces/estudiante.interface';

@Component({
  selector: 'app-tramite-header',
  templateUrl: './tramite-header.component.html',
  styleUrls: ['./tramite-header.component.scss']
})
export class TramiteHeaderComponent {
  @Input() estudiante?: Persona = undefined;
  @Input() inscripcion?: Inscripcion = undefined;
  @Input() tramite?: TramiteInscripcionCarrera = undefined;
  constructor(
  ) { }
}
