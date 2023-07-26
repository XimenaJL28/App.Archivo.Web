import { Component, OnInit } from '@angular/core';

import { TramiteService } from '../../services/tramite.service';

@Component({
  selector: 'app-tramites-page',
  templateUrl: './tramites-page.component.html',
  styleUrls: ['./tramites-page.component.scss']
})
export class TramitesPageComponent implements OnInit {
  public tramite: any = undefined;
  public tramites: any[] = [];
  public tramiteSubTipos: any[] = [];
  public plantillas: any[] = [];

  constructor(
    private readonly tramiteService: TramiteService
  ) { }

  ngOnInit(): void {
    this._getTramites()
      .then((request: any) => {
        this.tramites = request;
      });
  }

  async _getTramites() {
    const response = await this.tramiteService.getListTramiteUniversidad();
    const tramites = response || [];
    return tramites;
  }

  async getSubtramites(tramite: any) {
    const response = await this.tramiteService.getListTramiteSubTipo(tramite.idTramite);
    this.tramiteSubTipos = response || [];

    this.tramite = tramite;
  }
}
