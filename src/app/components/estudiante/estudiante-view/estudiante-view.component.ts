import { Component, Input } from '@angular/core';

import { Persona } from '../../../interfaces/estudiante.interface';

@Component({
  selector: 'app-estudiante-view',
  templateUrl: './estudiante-view.component.html',
  styleUrls: ['./estudiante-view.component.scss']
})
export class EstudianteViewComponent {
  @Input() persona!: Persona;

  constructor() { }
}
