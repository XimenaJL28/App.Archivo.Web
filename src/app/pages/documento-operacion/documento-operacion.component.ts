import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/reducers/app.reducers';

import { TramiteService } from 'src/app/services/tramite.service';
import { TramiteState } from 'src/app/state/reducers/tramite.reducers';

@Component({
  selector: 'app-documento-operacion',
  templateUrl: './documento-operacion.component.html',
  styleUrls: ['./documento-operacion.component.scss']
})
export class DocumentoOperacionComponent implements OnInit, OnDestroy {
  public documento: any;
  public operacion: any;

  private tramiteSubscriptions!: Subscription;

  constructor(private store: Store<{ tramite: TramiteState }>,
    private tramiteService: TramiteService,
    private router: Router) { }

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
