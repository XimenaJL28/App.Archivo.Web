import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

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
  public documentosFaltantes: any[] = [];

  private estudianteSubscriptions!: Subscription;
  private tramiteSubscriptions!: Subscription;

  constructor(
    private store: Store<{ estudiante: EstudianteState, tramite: TramiteState }>) { }

  ngOnInit(): void {
    this.estudianteSubscriptions = this.store.select('estudiante').subscribe(state => {
      this.estudiante = state.estudiante;
      this.inscripcion = state.inscripcion;
      this.tramite = state.tramite;
    })

    this.tramiteSubscriptions = this.store.select('tramite').subscribe(state => {
      this.documentos = state.documentos;
      this.documentosFaltantes = state.documentosFaltantes;
    })
  }

  ngOnDestroy(): void {
    this.tramiteSubscriptions.unsubscribe();
    this.estudianteSubscriptions.unsubscribe();
  }
}
