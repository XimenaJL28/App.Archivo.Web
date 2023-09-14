import { Component, OnInit } from '@angular/core';

import { Tramite, UnidadAcademica } from '../../interfaces/tramite.interface';
import { TramiteService } from '../../services/tramite.service';
import { MainService } from '../../services/main.service';

import { PermisoGuard } from '../../guards/permiso.guard';
import { PlantillaService } from 'src/app/services/plantilla.service';
import { ListCarreraDTO } from 'src/app/interfaces/Plantilla.interface';

@Component({
  selector: 'app-tramites-page',
  templateUrl: './tramites-page.component.html',
  styleUrls: ['./tramites-page.component.scss'],
})
export class TramitesPageComponent implements OnInit {
  public unidadAcademica: UnidadAcademica[] = [];
  public tramite: any = undefined;
  public tramites: Tramite[] = [];
  public tramiteSubTipos: any[] = [];
  public plantillas: any[] = [];
  showplantilla: boolean = false;

  public carrera: ListCarreraDTO[] = [];
  public selectcarrera: any;
  public selectsubtramite: any;

  public showDocumentoTipo: boolean = false;

  constructor(
    private readonly tramiteService: TramiteService,
    private readonly permisoGuard: PermisoGuard,
    private readonly mainService: MainService,
    private readonly plantillaService: PlantillaService,
  ) { }

  ngOnInit(): void {
    Promise.all([
      this.getCarrera(),
      this.getListUnidadAcademicas(),
    ]).then((response) => {
    }).catch(err => {
    }).finally(() => {
    });
  }

  //? traer los tramites depenediendo de la unidad academica
  async getListUnidadAcademicas() {
    await this.tramiteService.getListUnidadAcademica()
      .then((response) => {
        this.unidadAcademica = response || [];
      }).finally(() => {
        this._getTramites()
          .then((request: any) => {
            this.tramites = request;
          });
      });
  }

  async _getTramites() {
    const unidadAcademica = this.unidadAcademica.find(item => item.nombre === 'UNIVERSIDAD')
    const unidadAcademicaId = unidadAcademica ? unidadAcademica.id : 0;
    const response = await this.tramiteService.getListTramiteUniversidad(unidadAcademicaId);
    const tramites = response || [];
    return tramites;
  }

  async listadocumentos() {
    // const carreraid = this.selectcarrera;
    await this.getSubtramites(this.selectsubtramite, this.selectcarrera);
  }

  async getSubtramites(tramite: any, carreraid: any) {
    const response = await this.tramiteService.getListTramiteSubTipo(tramite, carreraid);
    this.tramiteSubTipos = response || [];
    console.log(response);


  }


  async getCarrera() {
    await this.plantillaService.GetListCarrera()
      .then((carrerer: ListCarreraDTO[]) => {
        this.carrera = carrerer
      }).catch((error: any) => {
      }).finally(() => {
      });
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
