import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documento-operacion',
  templateUrl: './documento-operacion.component.html',
  styleUrls: ['./documento-operacion.component.scss']
})
export class DocumentoOperacionComponent implements OnInit {
  public documento:any;

  constructor() { }
  ngOnInit(): void { }
}
