import { Component, Input } from '@angular/core';

import { DocumentoOperacion } from '../../interfaces/tramite.interface';
import { DocumentoInscripcionCarrera } from '../../interfaces/estudiante.interface';

@Component({
  selector: 'app-operacion-view',
  templateUrl: './operacion-view.component.html',
  styleUrls: ['./operacion-view.component.scss']
})
export class OperacionViewComponent {
  @Input() documento!: DocumentoInscripcionCarrera;
  @Input() operacion!: DocumentoOperacion;

  constructor() { }
}
