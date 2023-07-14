import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-operacion-view',
  templateUrl: './operacion-view.component.html',
  styleUrls: ['./operacion-view.component.scss']
})
export class OperacionViewComponent implements OnInit {
  @Input() documento: any;
  @Input() operacion: any;

  constructor() { }

  ngOnInit(): void {
  }

}
