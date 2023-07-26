import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { EstudianteState } from '../../state/reducers/estudiante.reducers';
import { TramiteState } from '../../state/reducers/tramite.reducers';
import * as tramiteActions from '../../state/actions/tramite.actions';

import { DocumentoInscripcionCarrera, DocumentoInscripcionCarreraFaltantes, Inscripcion, Persona, TramiteInscripcionCarrera } from '../../interfaces/estudiante.interface';

@Component({
  selector: 'app-tramite-page',
  templateUrl: './tramite-page.component.html',
  styleUrls: ['./tramite-page.component.scss'],
  providers: [MessageService],
})
export class TramitePageComponent implements OnInit, OnDestroy {
  public documentos: DocumentoInscripcionCarrera[] = [];
  public documentosFaltantes: DocumentoInscripcionCarreraFaltantes[] = [];

  public estudiante?: Persona = undefined;
  public inscripcion?: Inscripcion = undefined;
  public tramite?: TramiteInscripcionCarrera = undefined;

  public visibleDocumentoSave: boolean = false;

  private estudianteSubscriptions!: Subscription;
  private tramiteSubscriptions!: Subscription;

  constructor(
    private store: Store<{ estudiante: EstudianteState, tramite: TramiteState }>,
    private messageService: MessageService,
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

  async setDocumentoSeleccionado(documento: DocumentoInscripcionCarreraFaltantes) {
    this.store.dispatch(
      tramiteActions.setDocumentoFaltante({ documentoFaltante: documento })
    )
    this.visibleDocumentoSave = true;
  }

  cerrarDialogModal(): void {
    this.visibleDocumentoSave = false;
    this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Message Content Saved' });
  }
}
