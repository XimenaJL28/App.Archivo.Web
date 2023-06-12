import { Component, OnInit } from '@angular/core';
import { TramiteService } from '../../services/tramite.service';
import { Requerido } from 'src/app/interfaces/tramite/requerido';
interface Tramite {
  name: string;
}

@Component({
  selector: 'app-requerido',
  templateUrl: './requerido.component.html',
  styleUrls: ['./requerido.component.scss']
})
export class RequeridoComponent implements OnInit {

  tramites!: Tramite[];

  selectedTramite!: Tramite;
  constructor(private readonly TramiteService: TramiteService) { }


  ngOnInit() {
    this.tramites = [
      { name: 'Seleccione un Trámite' },
      { name: 'Admisión' },
      { name: 'Convalidación' },
      { name: 'MDG' },
    ];
  }

  get documentosRequeridos(): Requerido[] {
    return this.TramiteService.getDocumentosRequeridos();
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Completado':
        return 'success';
      case 'Pendiente':
        return 'warning';
      case 'En proceso':
        return 'danger';
      case 'Devuelto':
        return 'info';
      default:
        return 'success';
    }
  }
}
