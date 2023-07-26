import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { TramiteState } from '../../state/reducers/tramite.reducers';

import { DocumentoInscripcionCarrera } from '../../interfaces/estudiante.interface';

@Component({
  selector: 'app-operacion-page',
  templateUrl: './operacion-page.component.html',
  styleUrls: ['./operacion-page.component.scss'],

})
export class OperacionPageComponent implements OnInit, OnDestroy {
  public documento?: DocumentoInscripcionCarrera = undefined;

  private tramiteSubscriptions!: Subscription;

  constructor(
    private store: Store<{ tramite: TramiteState }>,
  ) { }

  ngOnInit(): void {
    this.tramiteSubscriptions = this.store.select('tramite').subscribe(state => {
      this.documento = state.documento;
    });
  }

  ngOnDestroy(): void {
    this.tramiteSubscriptions.unsubscribe();
  }
}
