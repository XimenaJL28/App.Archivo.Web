import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Store } from '@ngrx/store';
import * as tramiteActions from '../../state/actions/tramite.actions';
import { TramiteState } from '../../state/reducers/tramite.reducers';

import { TramiteService } from '../../services/tramite.service';
import { Subscription } from 'rxjs';

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
  public tramiteSubTipos: any[] = [];
  public tramiteSubTipoSelected: any = undefined;

  public savedLoading: boolean = false;
  public adjunto: string = '';
  public cantidad: string = '';
  public fechaLimitedeEntrega: string = '';
  public fechaRegistro: string = '';

  private tramiteSubscriptions!: Subscription;

  constructor(
    private store: Store<{ tramite: TramiteState }>,
    private tramiteService: TramiteService,
    private messageService: MessageService
  ) {
    this.tramiteService.GetListTramiteSubTipoSelected().then((response: any) => {
      this.tramiteSubTipos = response || [];
    })

    this.tramiteService.GetListDocumentoTipoSelected().then((response: any) => {
      this.documentoTipos = response || [];
    })

    this.tramiteService.GetListDocumentoEstadoSelected().then((response: any) => {
      this.documentoEstados = response || [];
    })
  }

  ngOnInit(): void {
    this.tramiteSubscriptions = this.store.select('tramite').subscribe(state => {
      this.documento = state.documento;

      if (this.isUpdate && this.documento) {
        this.fechaRegistro = this.documento.fechaRegistro;
        this.cantidad = this.documento.cantidad;
        this.fechaLimitedeEntrega = this.documento.fechaLimitedeEntrega;

        this.tramiteSubTipoSelected = { id: this.documento.id, nombre: this.documento.nombre };
        this.documentoTipoSelected = { id: this.documento.id, nombre: this.documento.nombre };
        this.documentoEstadoSelected = { id: this.documento.id, nombre: this.documento.nombre };
      }
    })
  }

  ngOnDestroy(): void {
    this.tramiteSubscriptions.unsubscribe();
  }

  setUri(uri: string) {
    this.adjunto = uri;
  }

  async guardarDocumento() {
    const documento = {
      // documentoInscripcionCarreraId: this.documento.id,
      // documentoTipoId: this.documentoTipoSelected.id,
      // documentoEstadoId: this.documentoEstadoSelected.id,
      // tramiteInscripcionCarreraId: this.tramiteSubTipoSelected.id,
      // tramiteSubTipoId: this.tramiteSubTipoSelected.id,
      // cantidad: 0,
      // fechaLimiteEntrega: '2023-07-12T01:00:47.182Z',
      // fechaRegistro: '2023-07-12T01:00:47.182Z',
      // adjunto: this.adjunto || "hola",
      // fechaVencimiento: "2024-07-12T01:00:47.182Z"

      // documentoTipoId: 2,
      // documentoEstadoId: 1,
      // tramiteInscripcionCarreraId: 2,
      // tramiteSubTipoId: 2,
      // cantidad: 3,
      // fechaLimitedeEntrega: "2023-07-12T01:00:47.182Z",
      // adjunto: "string",
      // fechaVencimiento: "2023-07-12T01:00:47.182Z"

      documentoTipoId: this.documentoTipoSelected.id,
      documentoEstadoId: this.documentoEstadoSelected.id,
      tramiteInscripcionCarreraId: this.tramiteSubTipoSelected.id,
      tramiteSubTipoId: this.tramiteSubTipoSelected.id,
      cantidad: 0,
      fechaLimitedeEntrega: "2023-07-14T17:00:19.202Z",
      fechaRegistro: "2023-07-14T17:00:19.202Z",
      adjunto: "string",
      documentoTipoEstado: true,
      fechaVencimiento: "2025-07-14T17:00:19.202Z"
    }
    this.savedLoading = true;

    const response = await this.tramiteService.PostDocumentoInscripcionCarrera(documento);
    console.log(documento);
    
    if (!response) {
      this.savedLoading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
      return;
    }

    this.savedLoading = false;
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });

    this.store.dispatch(
      tramiteActions.addItemDocumento({ documento: documento })
    );
  }
}
