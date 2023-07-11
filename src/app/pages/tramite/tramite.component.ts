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
  public plantillas: any[] = [];

  constructor(
    private readonly tramiteService: TramiteService,
  ) { }

  ngOnInit(): void {
    this._gettramites()
      .then((request: any) => {
        this.tramites = request;
      });

  }

  async _gettramites() {
    const response = await this.tramiteService.GetListTramiteUniversidad();
    const tramites = response || [];
    return tramites;
  }

  async getsubtramites(tramite: any) {
    const response = await this.tramiteService.GetListTramiteSubTipo(tramite.idTramite);
    this.tramiteSubTipos = response || [];
    this.tramite = tramite;
  }

  // async getplantillas(subtipos: any) {
  //   const response = await this.tramiteService.GetListDocumentoPlantilla();
  //   this.plantillas = response || [];
  //   this.tramite = tramite;
  //   console.log(this.plantillas);    
  //   return this.plantillas;

  // }

  // async otis(tramiteSubTipos: any[]) {
  //   let subTipoDocumentoPlantillas: any[] = [];
  //   for (let index = 0; index < tramiteSubTipos.length; index++) {
  //     const element = tramiteSubTipos[index];
  //     this.tramiteService.GetListDocumentoPlantilla(element.tramiteSubTipoId)
  //       .then((item: any) => {
  //         console.log(item);
  //         subTipoDocumentoPlantillas.push(
  //           {
  //             tramiteSubTipo: element,
  //             documentoPlantillas: item,
  //           }
  //         );
  //       })
  //   }
  //   return subTipoDocumentoPlantillas;
  // }
}