import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DocumentoPlantillaDTO, EstadoPlantillaDTO, ListCarreraDTO, ListaDocumento, ListaTramiteDTO, TipoDocuemntoDTO, tramite } from 'src/app/interfaces/Plantilla.interface';
import { PlantillaService } from '../../services/plantilla.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectItemGroup } from 'primeng/api';


@Component({
  selector: 'app-dialog-plantilla',
  templateUrl: './dialog-plantilla.component.html',
  styleUrls: ['./dialog-plantilla.component.scss']
})
export class DialogPlantillaComponent implements OnInit {
  //lista de carreras
  carrera: ListCarreraDTO[] = [];
  list!: ListCarreraDTO;
  //lista de subtramites
  ltramite: tramite[] = [];
  tramite!: tramite[];

  //lista de elementos de la plantilla
  listadocument: ListaDocumento[] = [];

  //TipoDocumento
  tipodocumento!: TipoDocuemntoDTO[];
  estadoPlantilla!: EstadoPlantillaDTO[];

  //nombredoc
  nombredocs!: string;


  //forumulario de envio
  myForm: FormGroup = this.fb.group({
    carreraId: [0],
    tramiteSubTipoId: [0],
    listaDocumento: [null]
  });




  plantilla: DocumentoPlantillaDTO[] = [];
  dataCargada!: boolean;
  guardando: boolean = false;
  tabla: boolean = false;

  constructor(private fb: FormBuilder,
    // , public ref: DynamicDialogRef,
    // public config: DynamicDialogConfig,
    private readonly PlantillaService: PlantillaService) { }

  ngOnInit(): void {
    // this.GetPlantilla(1, 1010)
    this.GetCarrera()
    this.GetTramitesSubTramites()
    this.GetListTipoDocumento()
    this.ListaEstadoPlantilla()
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





  agregarElemento() {
    const nuevoElemento: ListaDocumento = { cantidadMinima: 2, plazoMaximo: 20, documentoTipoId: 0, estadoId: 0 };
    this.listadocument.push(nuevoElemento);
    console.log(this.listadocument);
    this.tabla = true;

  }
  //elimina elemnetos de la lista
  // eliminarelemento() {
  //   delete this.listadocument[this.listadocument.length - 1];
  // }

  async nombredoc(iddoc: number) {
    //buscar el nombre del tipodocumento
    let n = await this.tipodocumento.find(x => x.documentoTipoId == iddoc)?.nombre.toString()!;
    this.nombredocs = n
    console.log(this.nombredocs);


  }


}
