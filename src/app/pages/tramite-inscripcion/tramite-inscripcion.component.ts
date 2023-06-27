import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/reducers/app.reducers';

import { TramiteService } from '../../services/tramite.service';
import { EstudianteState } from 'src/app/state/reducers/estudiante.reducers';
import { TramiteState } from 'src/app/state/reducers/tramite.reducers';

@Component({
  selector: 'app-tramite-inscripcion',
  templateUrl: './tramite-inscripcion.component.html',
  styleUrls: ['./tramite-inscripcion.component.scss']
})
export class TramiteInscripcionComponent implements OnInit, OnDestroy {
  public tramite: any;
  public estudiante: any = null;
  public inscripcion: any = null;
  public documentos: any[] = [];

  private estudianteSubscriptions!: Subscription;
  private tramiteSubscriptions!: Subscription;

  constructor(
    private store: Store<{ estudiante: EstudianteState, tramite: TramiteState }>,
    private tramiteService: TramiteService,
    private router: Router) { }

  ngOnInit(): void {
    this.estudianteSubscriptions = this.store.select('estudiante').subscribe(state => {
      this.estudiante = state.estudiante;
      this.inscripcion = state.inscripcion;
      this.tramite = state.tramite;
    })

    this.tramiteSubscriptions = this.store.select('tramite').subscribe(state => {
      this.documentos = state.documentos;
    })
  }

  ngOnDestroy(): void {
    this.tramiteSubscriptions.unsubscribe();
    this.estudianteSubscriptions.unsubscribe();
  }
}
