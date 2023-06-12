import { Component, OnInit } from '@angular/core';
import { Operaciones } from 'src/app/interfaces/tramite/operaciones';
import { TramiteService } from '../../services/tramite.service';

@Component({
  selector: 'app-operacion',
  templateUrl: './operacion.component.html',
  styleUrls: ['./operacion.component.scss']
})
export class OperacionComponent implements OnInit {

  constructor(private readonly TramiteService: TramiteService) { }

  ngOnInit(): void {
  }
  get operaciones(): Operaciones[] {
    return this.TramiteService.getOperaciones();
  }

}
