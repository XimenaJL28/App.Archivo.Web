import { Component, OnInit } from '@angular/core';

import { TramiteService } from '../../services/tramite.service';
import { UnidadAcademica } from 'src/app/interfaces/tramite.interface';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogPlantillaComponent } from 'src/app/components/dialog-plantilla/dialog-plantilla.component';

@Component({
  selector: 'app-tramites-page',
  templateUrl: './tramites-page.component.html',
  styleUrls: ['./tramites-page.component.scss'],
  providers: [DialogService]

})
export class TramitesPageComponent implements OnInit {
  public unidadAcademica: UnidadAcademica[] = [];
  public tramite: any = undefined;
  public tramites: any[] = [];
  public tramiteSubTipos: any[] = [];
  public plantillas: any[] = [];

  constructor(
    private readonly tramiteService: TramiteService
    , public dialogService: DialogService,
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
    this.getSubtramites(1);
  }

  async _getTramites() {
    const unidadAcademica = this.unidadAcademica.find(item => item.nombre === 'UNIVERSIDAD')
    const unidadAcademicaId = unidadAcademica ? unidadAcademica.id : 0;

    // console.log(unidadAcademica, 'unidadAcademica');
    const response = await this.tramiteService.getListTramiteUniversidad(unidadAcademicaId);
    const tramites = response || [];
    // console.log(tramites, 'tr');
    return tramites;
  }

  async getSubtramites(tramite: any) {
    const response = await this.tramiteService.getListTramiteSubTipo(tramite);
    this.tramiteSubTipos = response || [];
    // this.tramite = tramite;
  }

  showDialogPlantilla() {
    const ref = this.dialogService.open(DialogPlantillaComponent, {
      header: 'Agregar plantilla',
      width: '600px'
    });
  }

}
