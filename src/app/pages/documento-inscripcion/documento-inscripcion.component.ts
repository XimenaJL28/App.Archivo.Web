import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as tramiteActions from '../../state/actions/tramite.actions';
import { EstudianteState } from '../../state/reducers/estudiante.reducers';
import { TramiteState } from '../../state/reducers/tramite.reducers';

import { TramiteService } from '../../services/tramite.service';

import { setColorDocumentoEstado } from '../../utils/color';
import { MessageService } from 'primeng/api';

import { DocumentoOperacion } from '../../interfaces/tramite.interface';
import { DocumentoInscripcionCarrera, TramiteInscripcionCarrera } from '../../interfaces/estudiante.interface';

@Component({
  selector: 'app-documento-inscripcion',
  templateUrl: './documento-inscripcion.component.html',
  styleUrls: ['./documento-inscripcion.component.scss'],
  providers: [MessageService],
})
export class DocumentoInscripcionComponent implements OnInit, OnDestroy {
  public tramite?: TramiteInscripcionCarrera = undefined;
  public documentos: DocumentoInscripcionCarrera[] = [];
  public documento?: DocumentoInscripcionCarrera = undefined;
  public operaciones: DocumentoOperacion[] = [];
  public operacion?: DocumentoOperacion = undefined;

  public visibleDocumentoUpdate: boolean = false;
  public visibleOperacion: boolean = false;

  private tramiteSubscriptions!: Subscription;
  private estudianteSubscriptions!: Subscription;

  constructor(
    private store: Store<{ estudiante: EstudianteState, tramite: TramiteState }>,
    private tramiteService: TramiteService,
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
      this.operacion = state.operacion;
    })
  }

  ngOnDestroy(): void {
    this.tramiteSubscriptions.unsubscribe();
    this.estudianteSubscriptions.unsubscribe();
  }

  async getOperaciones(documento: DocumentoInscripcionCarrera) {
    const response = await this.tramiteService.getListOperaciones(documento.documentoInscripcioncarreraId);
    const operaciones = response || [];

    this.store.dispatch(
      tramiteActions.setDocumento({ documento: documento, operaciones: operaciones })
    );
  }

  getOperacion(operacion: DocumentoOperacion): void {
    this.store.dispatch(
      tramiteActions.setOperacion({ operacion: operacion })
    )

    this.visibleOperacion = true;
  }

  async editarDocumento(documento: DocumentoInscripcionCarrera) {
    this.getOperaciones(documento).then(() => {
      this.visibleDocumentoUpdate = true;
    })
  }

  getColorDocumentoEstado(documento: DocumentoInscripcionCarrera): string {
    return setColorDocumentoEstado(documento);
  }

  cerrarDialogModal():void {
    this.visibleDocumentoUpdate = false;
    this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Actualizado Correctamente' });
  }
}
