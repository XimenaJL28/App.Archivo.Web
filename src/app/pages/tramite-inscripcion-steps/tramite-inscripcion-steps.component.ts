import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-tramite-inscripcion-steps',
  templateUrl: './tramite-inscripcion-steps.component.html',
  styleUrls: ['./tramite-inscripcion-steps.component.scss'],
  providers: [MessageService],
})
export class TramiteInscripcionStepsComponent implements OnInit {
  public items: MenuItem[] = [];
  public activeIndex: number = 0;

  constructor(
    private readonly MainService: MainService,
  ) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Trámite Inscripción',
        routerLink: 'inscripcion',
      },
      {
        label: 'Documento Inscripción',
        routerLink: 'documento',
      }
    ];
  }


}
