import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';

import { AddPlantillaDTO, DocumentoPlantillaDTO, EstadoPlantillaDTO, ListCarreraDTO, ListaDocumento, TipoDocuemntoDTO, tramite } from '../../../interfaces/Plantilla.interface';
import { PlantillaService } from '../../../services/plantilla.service';

import { MainService } from '../../../services/main.service';

@Component({
  selector: 'app-dialog-plantilla',
  templateUrl: './dialog-plantilla.component.html',
  styleUrls: ['./dialog-plantilla.component.scss']
})
export class DialogPlantillaComponent implements OnInit {
  //lista de carreras
  public carrera: ListCarreraDTO[] = [];
  //lista de subtramites
  public ltramite: tramite[] = [];

  //lista de elementos de la plantilla
  public listadocument: ListaDocumento[] = [];

  //TipoDocumento
  public tipodocumento!: TipoDocuemntoDTO[];
  public estadoPlantilla!: EstadoPlantillaDTO[];

  //nombredoc
  public nombredocs!: string;

  //lista de tramites
  public tramites: SelectItemGroup[] = [];

  //tramite y carrera seleccionado

  public selectramite: any;
  public selectcarrera: any;

  public plantilla: DocumentoPlantillaDTO[] = [];
  public dataCargada: boolean = false;
  public guardando: boolean = false;
  public tabla: boolean = false;

  @Input() canEdit: boolean = false;
  @Output() cerrarDialogModal: EventEmitter<void> = new EventEmitter();

  constructor(
    private readonly mainService: MainService,
    private readonly plantillaService: PlantillaService,
  ) { }

  ngOnInit(): void {
    Promise.all([
      this.getCarrera(),
      this.getTramitesSubTramites(),
    ]).then(() => {
    }).catch(err => {
    }).finally(() => {
      this.getListTipoDocumento();
      this.listaEstadoPlantilla();
      this.dataCargada = true;
    });

  }

  async getCarrera() {
    await this.plantillaService.GetListCarrera()
      .then((carrerer: ListCarreraDTO[]) => {
        this.carrera = carrerer
      }).catch((error: any) => {
        // this.MainService.mostrarToast({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los cursos' });
      }).finally(() => {
      });
  }

  /*async getPlantilla(tramitesubtipoId: number, carreraId: number) {
    await this.plantillaService.GetPlantilla(tramitesubtipoId, carreraId)
      .then((docplantilla: DocumentoPlantillaDTO[]) => {
        this.plantilla = docplantilla
      }).catch((error: any) => {
        console.log(error);
      }).finally(() => {
      });
  }*/

  async getTramitesSubTramites() {
    await this.plantillaService.GetTramitesSubTramites()
      .then((tramite: tramite[]) => {
        this.ltramite = tramite
      }).catch((error: any) => {
      }).finally(() => {
      });
  }

  async getListTipoDocumento() {
    await this.plantillaService.ListTipoDocumento()
      .then((tdocumento: TipoDocuemntoDTO[]) => {
        this.tipodocumento = tdocumento
      }).catch((error: any) => {
        // this.MainService.mostrarToast({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los cursos' });
      }).finally(() => {
      });
  }

  async listaEstadoPlantilla() {
    await this.plantillaService.ListaEstadoPlantilla()
      .then((EstadoPlantilladto: EstadoPlantillaDTO[]) => {
        this.estadoPlantilla = EstadoPlantilladto
      }).catch((error: any) => {
        // this.MainService.mostrarToast({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los cursos' });
      }).finally(() => {
      });
  }

  //guardar documento plantilla
  async agregarPlantilla() {
    if (
      !this.selectcarrera ||
      !this.selectramite ||
      !this._isValidListaDocumentos(this.listadocument)) {
      this.mainService.mostrarToast({ severity: 'error', summary: 'Error', detail: 'Datos no válidos' });
      return;
    }

    const plantilladto: AddPlantillaDTO = {
      carreraId: this.selectcarrera,
      tramiteSubTipoId: this.selectramite,
      listaDocumento: this.listadocument
    };


    this.plantillaService.AgregarPlantilla(plantilladto)
      .then((resp: any) => {
        let mensaje = resp.message;
        if (resp) {
          this.cerrarDialogModal.emit();
          this.limpiar();
        }
      }).catch((error: any) => {
        this.mainService.mostrarToast({ severity: 'error', summary: 'Error', detail: 'No se permiten valores duplicados' });
      }).finally(() => {
      });
  }

  _isValidListaDocumentos(listaDocumentos: ListaDocumento[]) {
    if (listaDocumentos.length == 0) return false;

    for (let index = 0; index < listaDocumentos.length; index++) {
      const element = listaDocumentos[index];
      if (element.documentoTipoId < 0 ||
        element.estadoId < 1 ||
        element.cantidadMinima < 2 ||
        element.plazoMaximo < 20
      )
        return false;
    }
    return true;
  }

  agregarElemento(): void {
    if (!this.tipodocumento || this.tipodocumento.length < 1) {
      this.mainService.mostrarToast({ severity: 'error', summary: 'Error', detail: 'No hay datos tipodocumento' });
      return;
    }

    if (!this.estadoPlantilla || this.estadoPlantilla.length < 1) {
      this.mainService.mostrarToast({ severity: 'error', summary: 'Error', detail: 'No hay datos estadoPlantilla' });
      return;
    }

    const nuevoElemento: ListaDocumento = {
      cantidadMinima: 2,
      plazoMaximo: 20,
      documentoTipoId: this.tipodocumento[0].documentoTipoId,
      estadoId: this.estadoPlantilla[0].estadoId
    };

    this.listadocument.push(nuevoElemento);
    this.tabla = true;
  }

  async limpiar() {
    this.listadocument.forEach(x => {
      this.eliminarElemento(x.documentoTipoId);
    });
  }
  // agregarElemento() {
  //   const nuevoElemento: ListaDocumento = { cantidadMinima: 2, plazoMaximo: 20, documentoTipoId: 0, estadoId: 0 };
  //   this.listadocument.push(nuevoElemento);
  //   this.tabla = true;
  // }

  // elimina elementos de la lista
  eliminarElemento(doctipo: number) {
    // delete this.listadocument[this.listadocument.length - 1];
    const resultado = this.listadocument.filter(x => x.documentoTipoId != doctipo);
    this.listadocument = [...resultado];
    if (this.listadocument.length == 0) {
      this.tabla = false;
    }
    else
      this.tabla = true;
  }

  // async nombredoc(iddoc: number) {
  //   //buscar el nombre del tipodocumento
  //   let n = await this.tipodocumento.find(x => x.documentoTipoId == iddoc)?.nombre.toString()!;
  //   this.nombredocs = n
  // }

}
