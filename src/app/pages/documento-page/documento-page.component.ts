import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { EstudianteState } from '../../state/reducers/estudiante.reducers';
import { TramiteState } from '../../state/reducers/tramite.reducers';
import * as tramiteActions from '../../state/actions/tramite.actions';

import { DocumentoInscripcionCarrera, TramiteInscripcionCarrera } from '../../interfaces/estudiante.interface';
import { DocumentoOperacion } from '../../interfaces/tramite.interface';

import { TramiteService } from '../../services/tramite.service';

@Component({
  selector: 'app-documento-page',
  templateUrl: './documento-page.component.html',
  styleUrls: ['./documento-page.component.scss'],
  providers: [MessageService],
})
export class DocumentoPageComponent implements OnInit, OnDestroy {
  public tramite?: TramiteInscripcionCarrera = undefined;
  public documentos: DocumentoInscripcionCarrera[] = [];
  public operaciones: DocumentoOperacion[] = [];
  public documento?: DocumentoInscripcionCarrera = undefined;

  public visibleDocumento: boolean = false;
  public visibleOperacionView: boolean = false;
  public visibleOperacionForm: boolean = false;

  private tramiteSubscriptions!: Subscription;
  private estudianteSubscriptions!: Subscription;

  constructor(
    private readonly tramiteService: TramiteService,
    private store: Store<{ estudiante: EstudianteState, tramite: TramiteState }>,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.estudianteSubscriptions = this.store.select('estudiante').subscribe(state => {
      this.tramite = state.tramite;
    })

    this.tramiteSubscriptions = this.store.select('tramite').subscribe(state => {
      this.documentos = state.documentos;
      this.documento = state.documento;
      this.operaciones = state.operaciones;
    })
  }

  ngOnDestroy(): void {
    this.tramiteSubscriptions.unsubscribe();
    this.estudianteSubscriptions.unsubscribe();
  }

  async setDocumentoSeleccionado(event: { documento: DocumentoInscripcionCarrera, update: boolean }) {
    const { documento, update } = event;
    const response = await this.tramiteService.getListOperaciones(documento.documentoInscripcioncarreraId);
    const operaciones = response || [];

    this.store.dispatch(
      tramiteActions.setDocumento({ documento: documento, operaciones: operaciones })
    );
    this.visibleDocumento = update;
  }

  setOperacionSeleccionada(operacion: DocumentoOperacion): void {
    this.store.dispatch(
      tramiteActions.setOperacion({ operacion: operacion })
    )

    this.visibleOperacionView = true;
  }

  setNuevaOperacion(): void {
    this.visibleOperacionForm = true;
  }

  cerrarDocumentoDialogModal(): void {
    console.log('asasa doc mod');
    this.visibleDocumento = false;
    this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Message Content Saved' });
  }

  setVisibleOperacion() {
    this.visibleOperacionForm = true;
  }

  cerrarOperacionDialogModal(): void {
    this.visibleOperacionForm = false;
    this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Message Content Saved' });
  }
}
