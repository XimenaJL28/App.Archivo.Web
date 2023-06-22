import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documento-inscripcion',
  templateUrl: './documento-inscripcion.component.html',
  styleUrls: ['./documento-inscripcion.component.scss']
})
export class DocumentoInscripcionComponent implements OnInit {
  public tramite:any;
  public documentos:any[] = [];
  public documento:any;
  public operaciones:any[] = [];

  constructor() { }

  ngOnInit(): void {

  }

}
