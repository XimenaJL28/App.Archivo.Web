import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DocumentoPlantillaDTO, ListCarreraDTO } from 'src/app/interfaces/Plantilla.interface';
import { PlantillaService } from '../../services/plantilla.service';

@Component({
  selector: 'app-dialog-plantilla',
  templateUrl: './dialog-plantilla.component.html',
  styleUrls: ['./dialog-plantilla.component.scss']
})
export class DialogPlantillaComponent implements OnInit {
  carrera: ListCarreraDTO[] = [];
  list!: ListCarreraDTO;
  selectedCarrer: string | undefined;

  plantilla: DocumentoPlantillaDTO[] = [];
  dataCargada!: boolean;
  guardando: boolean = false;

  constructor(public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private readonly PlantillaService: PlantillaService) { }

  ngOnInit(): void {
    this.GetPlantilla(1, 1010)
    this.GetCarrera()
  }


  async GetCarrera() {
    await this.PlantillaService.GetListCarrera().then((carrerer: ListCarreraDTO[]) => {
      this.carrera = carrerer
    }).catch((error: any) => {
      console.log(error);
      // this.MainService.mostrarToast({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los cursos' });
    }).finally(() => {
      this.dataCargada = false;
      console.log(this.carrera);
    });
  }



  async GetPlantilla(tramitesubtipoId: number, carreraId: number) {
    await this.PlantillaService.GetPlantilla(tramitesubtipoId, carreraId).then((docplantilla: DocumentoPlantillaDTO[]) => {
      this.plantilla = docplantilla
    }).catch((error: any) => {
      console.log(error);
      // this.MainService.mostrarToast({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los cursos' });
    }).finally(() => {
      this.dataCargada = false;
      console.log(this.plantilla);
    });
  }

}
