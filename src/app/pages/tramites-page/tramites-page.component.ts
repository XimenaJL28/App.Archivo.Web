import { Component, OnInit } from '@angular/core';

import { TramiteService } from '../../services/tramite.service';
import { UnidadAcademica } from 'src/app/interfaces/tramite.interface';

@Component({
  selector: 'app-tramites-page',
  templateUrl: './tramites-page.component.html',
  styleUrls: ['./tramites-page.component.scss']
})
export class TramitesPageComponent implements OnInit {
  public unidadAcademica: UnidadAcademica[] = [];
  public tramite: any = undefined;
  public tramites: any[] = [];
  public tramiteSubTipos: any[] = [];
  public plantillas: any[] = [];

  constructor(
    private readonly tramiteService: TramiteService
  ) { }

  ngOnInit(): void {
    this.tramiteService.getListUnidadAcademica()
      .then((response) => {
        this.unidadAcademica = response || [];
      }).finally(() => {
        this._getTramites()
          .then((request: any) => {
            this.tramites = request;
          });
      })
  }

  async _getTramites() {
    const unidadAcademica = this.unidadAcademica.find(item => item.nombre === 'UNIVERSIDAD')
    const unidadAcademicaId = unidadAcademica ? unidadAcademica.id : 0;

    console.log(unidadAcademica, 'unidadAcademica');
    const response = await this.tramiteService.getListTramiteUniversidad(unidadAcademicaId);
    const tramites = response || [];
    console.log(tramites, 'tr');
    return tramites;
  }

  async getSubtramites(tramite: any) {
    const response = await this.tramiteService.getListTramiteSubTipo(tramite.idTramite);
    this.tramiteSubTipos = response || [];

    this.tramite = tramite;
  }
}
