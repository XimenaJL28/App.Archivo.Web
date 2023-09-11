import { Component, OnInit } from '@angular/core';

import { UnidadAcademica } from '../../interfaces/tramite.interface';
import { TramiteService } from '../../services/tramite.service';
import { MainService } from '../../services/main.service';

import { PermisoGuard } from '../../guards/permiso.guard';

@Component({
  selector: 'app-tramites-page',
  templateUrl: './tramites-page.component.html',
  styleUrls: ['./tramites-page.component.scss'],
})
export class TramitesPageComponent implements OnInit {
  public unidadAcademica: UnidadAcademica[] = [];
  public tramite: any = undefined;
  public tramites: any[] = [];
  public tramiteSubTipos: any[] = [];
  public plantillas: any[] = [];
  showplantilla: boolean = false;

  public canViewPlantilla: boolean = false;
  public canEditPlantilla: boolean = false;

  public showDocumentoTipo: boolean = false;

  constructor(
    private readonly tramiteService: TramiteService,
    private readonly permisoGuard: PermisoGuard,
    private readonly mainService: MainService,
  ) { }

  ngOnInit(): void {
    this.canEditPlantilla = this.permisoGuard.canEditPlantilla();
    this.canViewPlantilla = this.permisoGuard.canViewPlantilla();

    this.tramiteService.getListUnidadAcademica()
      .then((response) => {
        this.unidadAcademica = response || [];
      }).finally(() => {
        this._getTramites()
          .then((request: any) => {
            this.tramites = request;
          });
      })
    // this.getSubtramites(1);
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
  }

  showDialogPlantilla() {
    this.showplantilla = true;
  }

  cerrarPlantillaDialogModal(): void {
    this.showplantilla = false;
    this.mainService.mostrarToast({ severity: 'success', summary: 'Success', detail: 'Se ha registrado los documentos a la plantilla' });
  }

  showDialogDocumentoTipo() {
    this.showDocumentoTipo = true;
  }

  cerrarDocumentoTipoDialogModal(): void {
    this.showDocumentoTipo = false;
    this.mainService.mostrarToast({ severity: 'success', summary: 'Success', detail: 'Se ha registrado los documentos a la plantilla' });
  }

  permisoTipo(idinterfaz: number, IdTarea: number) {
    // return this.interfaz.tareas.filter((x: any) => x.id == IdTarea).length > 0 ? true : false;
    return this.mainService.verificarPermisos(idinterfaz, IdTarea);
  }
}
