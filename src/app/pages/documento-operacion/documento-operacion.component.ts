import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/state/reducers/user.reducer';
import * as tramiteActions from '../../state/actions/tramite.actions';

import { TramiteService } from 'src/app/services/tramite.service';
import { TramiteState } from 'src/app/state/reducers/tramite.reducers';
import { EstudianteState } from 'src/app/state/reducers/estudiante.reducers';

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
  public funcionarioId: string = '';
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
    this.tramiteService.GetDocumentoOperacionTipoSelected().then((response: any) => {
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
      !this.documentoOperacionTipoSelected) {
      this.messageService.add({ severity: 'error', summary: 'Datos no validos', detail: 'Revizar valores insertados' });
      this.savedLoading = false;
      return;
    }

    const operacionDTO = {
      documentoInscripcionCarreraId: this.documento.documentoInscripcioncarreraId || 13,
      funcionarioId: this.user?.id || 13,
      documentoOperacionTipoId: this.documentoOperacionTipoSelected?.id || 13,
      descripcion: this.descripcion,
      adjunto: this.adjunto,
    }

    console.log(operacionDTO)

    const response = await this.tramiteService.PostDocumentoOperacion(operacionDTO);
    console.log(response);
    if (!response) {
      this.savedLoading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
      return;
    }

    this.savedLoading = false;
    this.descripcion = '';
    this.adjunto = '';
    this.fechaOperacion = '';

    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });

    this.store.dispatch(
      tramiteActions.addItemOperacion({ operacion: operacionDTO })
    );
  }

  nuevaOperacion() {
    this.descripcion = '';
    this.adjunto = '';
    this.fechaOperacion = '';
    this.funcionarioId = this.user?.nombreFuncionario || "";
  }
}
