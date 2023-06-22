import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tramite-inscripcion',
  templateUrl: './tramite-inscripcion.component.html',
  styleUrls: ['./tramite-inscripcion.component.scss']
})
export class TramiteInscripcionComponent implements OnInit {
  public carrera:string = '';
  public estudiante:any = null;
  public tramite:any;
  public documentos: any[] = [];

  constructor() { }

  ngOnInit(): void {

  }

}
