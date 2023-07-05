import { Component, OnInit } from '@angular/core';
import { TramiteService } from 'src/app/services/tramite.service';

@Component({
  selector: 'app-tramite',
  templateUrl: './tramite.component.html',
  styleUrls: ['./tramite.component.scss']
})
export class TramiteComponent implements OnInit {
  public tramite: any = {};
  public tramites: any[] = [];
  public tramiteSubTipos: any[] = [];

  constructor(
    private readonly tramiteService: TramiteService,
  ) { }

  ngOnInit(): void {
    this._gettramites()
    .then((request: any)=>{
      this.tramites = request;
    });
  }

  async _gettramites() {
    const response = await this.tramiteService.GetListTramiteUniversidad();
    const tramites = response || [];
    return tramites;
  }

  async getsubtramites(tramite: any) {
    const response = await this.tramiteService.GetListTramiteSubTipo(tramite.tramiteId);
    this.tramiteSubTipos = response || [];
    this.tramite = tramite;
  }
}
