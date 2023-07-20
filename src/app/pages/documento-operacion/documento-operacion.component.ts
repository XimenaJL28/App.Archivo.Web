import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { UserState } from '../../state/reducers/user.reducer';
import { TramiteState } from '../../state/reducers/tramite.reducers';
import * as tramiteActions from '../../state/actions/tramite.actions';

import { TramiteService } from '../../services/tramite.service';
import { DocumentoInscripcionCarrera, DropDownItem } from '../../interfaces/estudiante.interface';
import { DocumentoOperacion, DocumentoOperacionSave } from '../../interfaces/tramite.interface';

@Component({
  selector: 'app-documento-operacion',
  templateUrl: './documento-operacion.component.html',
  styleUrls: ['./documento-operacion.component.scss'],
  providers: [MessageService]
})
export class DocumentoOperacionComponent implements OnInit, OnDestroy {
  public documento?: DocumentoInscripcionCarrera = undefined;
  public user?: UserState = undefined;

  public documentoOperacionTipos: DropDownItem[] = [];
  public documentoOperacionTipoSelected?: DropDownItem = undefined;
  public fechaOperacion: string = '';
  public nombreFuncionario: string = '';
  public adjunto: string = '';
  public descripcion: string = '';

  public savedLoading: boolean = false;

  private tramiteSubscriptions!: Subscription;
  private userSubscriptions!: Subscription;

  constructor(
    private store: Store<{ tramite: TramiteState, user: UserState }>,
    private tramiteService: TramiteService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.tramiteService.getDropDownDocumentoOperacionTipo().then((response: any) => {
      this.documentoOperacionTipos = response || [];
    })

    this.tramiteSubscriptions = this.store.select('tramite').subscribe(state => {
      this.documento = state.documento;
      this.documentoOperacionTipoSelected = state.documentoOperacionTipo;
    })

    this.userSubscriptions = this.store.select('user').subscribe(state => {
      this.user = state;
    })
  }

  ngOnDestroy(): void {
    this.tramiteSubscriptions.unsubscribe();
    this.userSubscriptions.unsubscribe();
  }

  setSelectedDocumentoOperacionTipo(event: any): void {
    this.store.dispatch(
      tramiteActions.setSelectedDocumentoOperacionTipo({ documentoOperacionTipo: event.value })
    );
  }

  setUri(uri: string): void {
    this.adjunto = uri;
  }

  async guardarOperacion() {
    this.savedLoading = true;

    // validacion de datos
    if (//this.adjunto.trim().length < 1 ||
      !this.user ||
      this.descripcion.trim().length < 1 ||
      !this.documentoOperacionTipoSelected ||
      !this.documento
    ) {
      this.messageService.add({ severity: 'error', summary: 'Datos no validos', detail: 'Revizar valores insertados' });
      this.savedLoading = false;
      return;
    }

    const operacionDTO: DocumentoOperacionSave = {
      documentoInscripcionCarreraId: this.documento.documentoInscripcioncarreraId,
      funcionarioId: this.user.id,
      documentoOperacionTipoId: this.documentoOperacionTipoSelected.id,
      descripcion: this.descripcion,
      adjunto: this.adjunto,
      estado: false
    }

    const response = await this.tramiteService.postDocumentoOperacion(operacionDTO);
    if (!response) {
      this.savedLoading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
      return;
    }

    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });

    const documentoOperacion: DocumentoOperacion = {
      ...operacionDTO,
      documentoOperacionId: response?.documentoOperacionId || 1,
      fechaOperacion: response?.fechaOperacion || new Date().toString(),
      nombreDocumentoOperacionTipo: this.documentoOperacionTipoSelected.nombre,
      nombreFuncionario: this._getNombreFuncionario(),
    }

    this.store.dispatch(
      tramiteActions.addItemOperacion({ operacion: documentoOperacion })
    );

    this.savedLoading = false;
  }

  nuevaOperacion(): void {
    this._clearForm();
    this.nombreFuncionario = this._getNombreFuncionario();
  }

  _clearForm(): void {
    this.descripcion = '';
    this.adjunto = '';
    this.fechaOperacion = '';
  }

  _getNombreFuncionario(): string {
    return this.user ? `${this.user.nombre} ${this.user.primerApellido} ${this.user.segundoApellido}` : 'desconocido';
  }
}
