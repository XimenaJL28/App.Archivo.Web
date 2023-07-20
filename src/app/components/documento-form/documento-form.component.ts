import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { EstudianteState } from '../../state/reducers/estudiante.reducers';
import * as tramiteActions from '../../state/actions/tramite.actions';
import { TramiteState } from '../../state/reducers/tramite.reducers';

import { TramiteService } from '../../services/tramite.service';

@Component({
  selector: 'app-documento-form',
  templateUrl: './documento-form.component.html',
  styleUrls: ['./documento-form.component.scss'],
  providers: [MessageService],
})
export class DocumentoFormComponent implements OnInit {
  @Input() isUpdate: boolean = false;
  public documento: any = undefined;
  public documentoTipos: any[] = [];
  public documentoTipoSelected: any = undefined;
  public documentoEstados: any[] = [];
  public documentoEstadoSelected: any = undefined;
  public tramite: any = undefined;

  public savedLoading: boolean = false;
  public adjunto: string = '';
  public cantidad: number = 0;
  public fechaLimitedeEntrega: any = '';
  public fechaVencimiento: any = '';

  public dateFormat: string = 'dd-mm-yy'

  private estudianteSubscriptions!: Subscription;
  private tramiteSubscriptions!: Subscription;

  constructor(
    private store: Store<{ tramite: TramiteState, estudiante: EstudianteState, }>,
    private tramiteService: TramiteService,
    private messageService: MessageService
  ) {
    this.tramiteService.getListDocumentoTipoSelected().then((response: any) => {
      this.documentoTipos = response || [];
    })

    this.tramiteService.getListDocumentoEstadoSelected().then((response: any) => {
      this.documentoEstados = response || [];
    })
  }

  ngOnInit(): void {
    this.estudianteSubscriptions = this.store.select('estudiante').subscribe(state => {
      this.tramite = state.tramite;
    })

    this.tramiteSubscriptions = this.store.select('tramite').subscribe(state => {
      this.documento = state.documento;

      if (this.isUpdate && this.documento) {
        this.fechaVencimiento = this._stringToDate(this.documento.fechaVencimiento) ;
        this.fechaLimitedeEntrega = this._stringToDate(this.documento.fechaLimitedeEntrega);
        this.cantidad = this.documento.cantidad;
        this.adjunto = this.documento.adjunto;

        this.documentoTipoSelected = { id: this.documento.documentoTipoId, nombre: this.documento.nombreDocumentoTipo };
        this.documentoEstadoSelected = { id: this.documento.documentoEstadoId, nombre: this.documento.nombreDocumentoEstado };
      }
    })
  }

  ngOnDestroy(): void {
    this.tramiteSubscriptions.unsubscribe();
    this.estudianteSubscriptions.unsubscribe();
  }

  setUri(uri: string) {
    this.adjunto = uri;
  }

  async guardarDocumento() {
    this.savedLoading = true;
    if (this.adjunto.trim().length < 1 ||
      !this.fechaLimitedeEntrega ||
      !this.fechaVencimiento ||
      !this.documentoTipoSelected ||
      !this.documentoEstadoSelected ||
      !this.tramite) {
      this.messageService.add({ severity: 'error', summary: 'Datos no validos', detail: 'Revizar valores insertados' });
      this.savedLoading = false;
      return;
    }

    const documentoDTO = {
      documentoTipoId: this.documentoTipoSelected.id,
      documentoEstadoId: this.documentoEstadoSelected.id,
      tramiteInscripcionCarreraId: this.tramite.id,
      tramiteSubTipoId: this.tramite.tramiteSubTipoId,
      cantidad: this.cantidad,
      // fechaRegistro: '',
      fechaLimitedeEntrega: this._dateToString(this.fechaLimitedeEntrega),
      adjunto: this.adjunto,
      fechaVencimiento: this._dateToString(this.fechaVencimiento)
    }

    const response = (this.isUpdate && this.documento) ?
      await this.tramiteService.putDocumentoInscripcionCarrera({
        documentoInscripcioncarreraId: this.documento.documentoInscripcioncarreraId,
        ...documentoDTO
      }) :
      await this.tramiteService.postDocumentoInscripcionCarrera(documentoDTO);

    // updated error
    if (this.documento && response) {
      console.log('updated error')
      this.savedLoading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
      return;
    }

    // saved error
    if (!this.documento && !response) {
      // console.log('saved error')
      this.savedLoading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
      return;
    }

    // updated ok
    if (this.documento && !response) {
      console.log('updated ok')
      this.store.dispatch(
        tramiteActions.updItemDocumento({ documento: documentoDTO })
      );
      this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Message Content Update' });
    }

    // saved ok
    if (!this.documento && response) {
      console.log('saved ok')
      this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Message Content Saved' });

      this.store.dispatch(
        tramiteActions.addItemDocumento({ documento: documentoDTO })
      );
    }

    this.savedLoading = false;
  }

  _clearForm() {
    this.adjunto = '';
    this.cantidad = 0;
    this.fechaLimitedeEntrega = undefined;
    this.fechaVencimiento = undefined;
  }

  _stringToDate(date: string): Date | undefined {
    return date ? new Date(date) : undefined;
  }

  _dateToString(date: Date): string {
    return date ? date.toISOString() : '';
  }
}
