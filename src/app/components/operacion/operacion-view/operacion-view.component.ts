import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { TramiteState } from '../../../state/reducers/tramite.reducers';

import { DocumentoOperacion } from '../../../interfaces/tramite.interface';
import { DocumentoInscripcionCarrera } from '../../../interfaces/estudiante.interface';

@Component({
  selector: 'app-operacion-view',
  templateUrl: './operacion-view.component.html',
  styleUrls: ['./operacion-view.component.scss']
})
export class OperacionViewComponent implements OnInit, OnDestroy {
  public documento?: DocumentoInscripcionCarrera;
  public operacion?: DocumentoOperacion;

  private tramiteSubscriptions!: Subscription;

  constructor(
    private store: Store<{ tramite: TramiteState }>,
  ) { }

  ngOnInit(): void {
    this.tramiteSubscriptions = this.store.select('tramite').subscribe(state => {
      this.documento = state.documento;
      this.operacion = state.operacion;
    })
  }

  ngOnDestroy(): void {
    this.tramiteSubscriptions.unsubscribe();
  }
}
