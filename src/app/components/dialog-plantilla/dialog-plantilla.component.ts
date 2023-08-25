import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddPlantillaDTO, DocumentoPlantillaDTO, EstadoPlantillaDTO, ListCarreraDTO, ListaDocumento, ListaTramiteDTO, TipoDocuemntoDTO, tramite } from 'src/app/interfaces/Plantilla.interface';
import { PlantillaService } from '../../services/plantilla.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectItemGroup } from 'primeng/api';
import { MainService } from '../../services/main.service';


@Component({
  selector: 'app-dialog-plantilla',
  templateUrl: './dialog-plantilla.component.html',
  styleUrls: ['./dialog-plantilla.component.scss']
})
export class DialogPlantillaComponent implements OnInit {
  //lista de carreras
  carrera: ListCarreraDTO[] = [];
  //lista de subtramites
  ltramite: tramite[] = [];

  //lista de elementos de la plantilla
  listadocument: ListaDocumento[] = [];

  //TipoDocumento
  tipodocumento!: TipoDocuemntoDTO[];
  estadoPlantilla!: EstadoPlantillaDTO[];

  //nombredoc
  nombredocs!: string;

  //lista de tramites
  tramites: SelectItemGroup[] = [];

  //tramite y carrera seleccionado 

  selectramite: any;
  selectcarrera: any;


  plantilla: DocumentoPlantillaDTO[] = [];
  dataCargada: boolean = false;
  guardando: boolean = false;
  tabla: boolean = false;

  constructor(
    private readonly MainService: MainService,
    private readonly PlantillaService: PlantillaService) {
  }

  ngOnInit(): void {
    Promise.all([
      this.GetCarrera(),

      this.GetTramitesSubTramites(),
    ]).then(() => {
    }).catch(err => {
    }).finally(() => {
      this.GetListTipoDocumento();
      this.ListaEstadoPlantilla();
      this.dataCargada = true;
    });
  }


  async GetCarrera() {
    await this.PlantillaService.GetListCarrera().then((carrerer: ListCarreraDTO[]) => {
      this.carrera = carrerer
    }).catch((error: any) => {
      console.log(error);
      // this.MainService.mostrarToast({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los cursos' });
    }).finally(() => {

    });
  }


  async GetPlantilla(tramitesubtipoId: number, carreraId: number) {
    await this.PlantillaService.GetPlantilla(tramitesubtipoId, carreraId).then((docplantilla: DocumentoPlantillaDTO[]) => {
      this.plantilla = docplantilla
    }).catch((error: any) => {
      console.log(error);
    }).finally(() => {
    });
  }

  async GetTramitesSubTramites() {
    await this.PlantillaService.GetTramitesSubTramites().then((tramite: tramite[]) => {
      this.ltramite = tramite
    }).catch((error: any) => {
      console.log(error);
    }).finally(() => {
      console.log(this.ltramite);

    });
  }

  async GetListTipoDocumento() {
    await this.PlantillaService.ListTipoDocumento().then((tdocumento: TipoDocuemntoDTO[]) => {
      this.tipodocumento = tdocumento
    }).catch((error: any) => {
      console.log(error);
      // this.MainService.mostrarToast({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los cursos' });
    }).finally(() => {
    });
  }

  async ListaEstadoPlantilla() {
    await this.PlantillaService.ListaEstadoPlantilla().then((EstadoPlantilladto: EstadoPlantillaDTO[]) => {
      this.estadoPlantilla = EstadoPlantilladto
    }).catch((error: any) => {
      console.log(error);
      // this.MainService.mostrarToast({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los cursos' });
    }).finally(() => {
      console.log(this.estadoPlantilla);
    });
  }

  //guardar documento plantilla
  async AgregarPlantilla() {

    let plantilladto: AddPlantillaDTO = { carreraId: this.selectcarrera, tramiteSubTipoId: this.selectramite, listaDocumento: this.listadocument };
    let response = await this.PlantillaService.AgregarPlantilla(plantilladto).then((resp: any) => {
    }).catch((error: any) => {
      console.log(error);
      this.MainService.mostrarToast({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar la plantilla' });
    }).finally(() => {
      this.MainService.mostrarToast({ severity: 'success', summary: 'Success', detail: 'Se ha registrado los documentos a la plantilla' });

    });
  }





  agregarElemento() {
    const nuevoElemento: ListaDocumento = { cantidadMinima: 2, plazoMaximo: 20, documentoTipoId: 0, estadoId: 0 };
    this.listadocument.push(nuevoElemento);
    this.tabla = true;
  }
  // elimina elemnetos de la lista
  eliminarelemento(doctipo: number) {
    // delete this.listadocument[this.listadocument.length - 1];
    const resultado = this.listadocument.filter(x => x.documentoTipoId != doctipo);
    this.listadocument = resultado;
  }

  // async nombredoc(iddoc: number) {
  //   //buscar el nombre del tipodocumento
  //   let n = await this.tipodocumento.find(x => x.documentoTipoId == iddoc)?.nombre.toString()!;
  //   this.nombredocs = n
  // }


}
