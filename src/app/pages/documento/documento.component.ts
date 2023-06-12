import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TramiteService } from '../../services/tramite.service';
import { Documento } from 'src/app/interfaces/tramite/documento';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.scss']
})
export class DocumentoComponent implements OnInit {

  constructor(private router: Router, private readonly TramiteService: TramiteService) { }

  ngOnInit(): void {
  }
  atras() {
    window.history.back();
  }

  get documento(): Documento {
    return this.TramiteService.getDocumento();
  }

  navigateToArchivos() {
    const id = 1;
    this.router.navigate([`/tramite/${id}/estudiante/${id}/archivo`]);
  }

}
