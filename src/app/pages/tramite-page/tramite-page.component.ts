import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { EstudianteState } from '../../state/reducers/estudiante.reducers';
import { TramiteState } from '../../state/reducers/tramite.reducers';
import * as tramiteActions from '../../state/actions/tramite.actions';

import { DocumentoInscripcionCarrera, DocumentoInscripcionCarreraFaltantes, Inscripcion, Persona, TramiteInscripcionCarrera } from '../../interfaces/estudiante.interface';
import { Tramite } from 'src/app/interfaces/tramite.interface';
import { TramiteService } from 'src/app/services/tramite.service';

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
    private tramiteService: TramiteService
  ) { }

  ngOnInit(): void {
    this.tramiteSubscriptions = this.store.select('tramite').subscribe(state => {
      this.documentos = state.documentos;
      this.documentosFaltantes = state.documentosFaltantes;
    })

    this.estudianteSubscriptions = this.store.select('estudiante').subscribe(state => {
      this.estudiante = state.estudiante;
      this.inscripcion = state.inscripcion;
      this.tramite = state.tramite;
      if (this.tramite) {
        this.getTramites(this.tramite);
      }
    })


  }

  getTramites(tramite: TramiteInscripcionCarrera): void {
    this.tramiteService.getListDocumentos(tramite.id, tramite.tramiteSubTipoId)
      .then((response) => {
        const documentos = response || [];
        this.store.dispatch(
          tramiteActions.setDocumentos({ documentos: documentos, documentosFaltantes: [] })
        );
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
