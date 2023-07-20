import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { EstudianteState } from '../../state/reducers/estudiante.reducers';
import { TramiteState } from '../../state/reducers/tramite.reducers';
import * as tramiteActions from '../../state/actions/tramite.actions';

import { DocumentoInscripcionCarrera, DocumentoInscripcionCarreraFaltantes, Inscripcion, Persona, TramiteInscripcionCarrera } from 'src/app/interfaces/estudiante.interface';

import { setColorDocumentoEstado } from '../../utils/color';

@Component({
  selector: 'app-tramite-inscripcion',
  templateUrl: './tramite-inscripcion.component.html',
  styleUrls: ['./tramite-inscripcion.component.scss']
})
export class TramiteInscripcionComponent implements OnInit, OnDestroy {
  public tramite?: TramiteInscripcionCarrera = undefined;
  public estudiante?: Persona = undefined;
  public inscripcion?: Inscripcion = undefined;
  public documentos: DocumentoInscripcionCarrera[] = [];
  public documentosFaltantes: DocumentoInscripcionCarreraFaltantes[] = [];

  public visibleDocumentoSave: boolean = false;

  private estudianteSubscriptions!: Subscription;
  private tramiteSubscriptions!: Subscription;

  constructor(
    private store: Store<{ estudiante: EstudianteState, tramite: TramiteState }>,
    private router: Router
  ) { }

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

  getColorDocumentoEstado(documento: DocumentoInscripcionCarrera): string {
    return setColorDocumentoEstado(documento);
  }

  async nuevoDocumento(documento: DocumentoInscripcionCarreraFaltantes) {
    this.store.dispatch(
      tramiteActions.setDocumentoFaltante({ documentoFaltante: documento })
    )
    this.visibleDocumentoSave = true;
  }
}
