import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DocumentoPlantillaDTO } from 'src/app/interfaces/Plantilla.interface';
import { PlantillaService } from '../../services/plantilla.service';

@Component({
  selector: 'app-dialog-plantilla',
  templateUrl: './dialog-plantilla.component.html',
  styleUrls: ['./dialog-plantilla.component.scss']
})
export class DialogPlantillaComponent implements OnInit {

  constructor(public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private readonly PlantillaService: PlantillaService) { }

  ngOnInit(): void {
    this.GetPlantilla(1, 1010)
  }

  async GetPlantilla(tramitesubtipoId: number, carreraId: number) {
    let response: DocumentoPlantillaDTO = await this.PlantillaService.GetPlantilla(tramitesubtipoId, carreraId);
    return response;
  }
}
