import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserState } from '../../state/reducers/user.reducer';
import { TramiteState } from '../../state/reducers/tramite.reducers';
import * as tramiteActions from '../../state/actions/tramite.actions';

import { TramiteService } from '../../services/tramite.service';

@Component({
  selector: 'app-documento-operacion',
  templateUrl: './documento-operacion.component.html',
  styleUrls: ['./documento-operacion.component.scss'],
  providers: [MessageService]
})
export class DocumentoOperacionComponent implements OnInit, OnDestroy {
  public documento: any = undefined;
  public user: any = undefined;

  public documentoOperacionTipos: any[] = [];
  public fechaOperacion: string = '';
  public nombreFuncionario: string = '';
  public adjunto: string = '';
  public descripcion: string = '';

  public documentoOperacionTipoSelected: any = undefined;
  public savedLoading: boolean = false;

  private tramiteSubscriptions!: Subscription;
  private userSubscriptions!: Subscription;

  constructor(
    private store: Store<{ tramite: TramiteState, user: UserState }>,
    private tramiteService: TramiteService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.tramiteService.getDocumentoOperacionTipoSelected().then((response: any) => {
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

  setSelectedDocumentoOperacionTipo(event: any) {
    this.store.dispatch(
      tramiteActions.setSelectedDocumentoOperacionTipo({ documentoOperacionTipo: event.value })
    );
  }

  ngOnDestroy(): void {
    this.tramiteSubscriptions.unsubscribe();
    this.userSubscriptions.unsubscribe();
  }

  setUri(uri: string) {
    this.adjunto = uri;
  }

  async guardarOperacion() {
    this.savedLoading = true;

    // validacion de datos
    if (this.adjunto.trim().length < 1 ||
      this.descripcion.trim().length < 1 ||
      !this.documentoOperacionTipoSelected ||
      !this.documento ||
      !this.user) {
      this.messageService.add({ severity: 'error', summary: 'Datos no validos', detail: 'Revizar valores insertados' });
      this.savedLoading = false;
      return;
    }

    const operacionDTO = {
      documentoInscripcionCarreraId: this.documento.documentoInscripcioncarreraId,
      funcionarioId: this.user.id,
      documentoOperacionTipoId: this.documentoOperacionTipoSelected.id,
      descripcion: this.descripcion,
      adjunto: this.adjunto,
    }

    const response = await this.tramiteService.postDocumentoOperacion(operacionDTO);
    if (!response) {
      this.savedLoading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
      return;
    }

    this.savedLoading = false;
    this._clearForm();

    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });

    this.store.dispatch(
      tramiteActions.addItemOperacion({ operacion: operacionDTO })
    );
  }

  nuevaOperacion() {
    this._clearForm();
    this.nombreFuncionario = this.user.nombreFuncionario || 'desconocido';
  }

  _clearForm() {
    this.descripcion = '';
    this.adjunto = '';
    this.fechaOperacion = '';
  }
}
