import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tramite-inscripcion-steps',
  templateUrl: './tramite-inscripcion-steps.component.html',
  styleUrls: ['./tramite-inscripcion-steps.component.scss'],
  providers: [MessageService],
})
export class TramiteInscripcionStepsComponent implements OnInit {
  public items: MenuItem[] = [];
  public activeIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Trámites ',
        routerLink: 'inscripcion',
      },
      {
        label: 'Documentos del Trámite',
        routerLink: 'documento',
      },
      {
        label: 'Operación de Documento',
        routerLink: 'operacion',
      },
    ];
  }

}
