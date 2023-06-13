import { Component, OnInit } from '@angular/core';
import { Reprogramacion } from 'src/app/interfaces/tramite/reprogramacion';
import { TramiteService } from '../../services/tramite.service';
import { Router } from '@angular/router';

interface Tramite {
  name: string;
}

@Component({
  templateUrl: './reprogramacion.component.html',
  styleUrls: ['./reprogramacion.component.scss']
})
export class ReprogramacionComponent implements OnInit {
  tramites!: Tramite[];

  selectedTramite!: Tramite;

  constructor(private router: Router,private readonly TramiteService: TramiteService) { }

  ngOnInit(): void {

    this.tramites = [
      { name: 'Seleccione una Operación' },
      { name: 'Admisión' },
      { name: 'Reprogramación' },
      { name: 'Convalidación' },
      { name: 'MDG' },
    ];
  }

  get reprogramacion(): Reprogramacion {
    return this.TramiteService.getReprogramacion();
  }
}
