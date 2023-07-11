import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/reducers/app.reducers';

import { TramiteService } from 'src/app/services/tramite.service';
import { TramiteState } from 'src/app/state/reducers/tramite.reducers';
import { UserState } from 'src/app/state/reducers/user.reducer';

@Component({
  selector: 'app-documento-operacion',
  templateUrl: './documento-operacion.component.html',
  styleUrls: ['./documento-operacion.component.scss']
})
export class DocumentoOperacionComponent implements OnInit, OnDestroy {
  public documento: any;
  public operacion: any;
  public documentoOperacionTipos: any[] = [];
  public documentoOperacion = {};
  public user: any = {};

  private tramiteSubscriptions!: Subscription;
  private estudianteSubscriptions!: Subscription;


  constructor(private store: Store<{ tramite: TramiteState, user: UserState }>,
    private tramiteService: TramiteService,
    private router: Router) { }

  ngOnInit(): void {
    this.tramiteService.GetListOperacionTipo().then((response: any) => {
      this.documentoOperacionTipos = response || [];
      console.log(this.documentoOperacionTipos);
    })
    this.tramiteSubscriptions = this.store.select('tramite').subscribe(state => {
      this.documento = state.documento;
      this.operacion = state.operacion;
    })
    this.estudianteSubscriptions = this.store.select('user').subscribe(state => {
      this.user = state;
    })
  }

  ngOnDestroy(): void {
    this.tramiteSubscriptions.unsubscribe();
  }

  setUri(uri: string) {
    // this.operacion.adjunto = uri;
    console.log(uri, "documentoOperacion");
  }

  async guardarOperacion() {
    const response = await this.tramiteService.PostOperacionTipo(this.operacion);
    this.operacion = response || {};
    const op = {
      funcionarioId: this.user.id
    }
  }
}