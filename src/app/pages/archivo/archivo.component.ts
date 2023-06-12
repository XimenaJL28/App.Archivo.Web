import { Component, OnInit } from '@angular/core';
import { Archivo } from 'src/app/interfaces/tramite/archivo';
import { TramiteService } from '../../services/tramite.service';

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.component.html',
  styleUrls: ['./archivo.component.scss']
})
export class ArchivoComponent implements OnInit {

  constructor(private readonly TramiteService: TramiteService) { }

  ngOnInit(): void {
  }

  get archivo(): Archivo {
    return this.TramiteService.getArchivo();
  }

}
