import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Store } from '@ngrx/store';
import * as tramiteActions from '../../state/actions/tramite.actions';
import { TramiteState } from '../../state/reducers/tramite.reducers';

import { TramiteService } from '../../services/tramite.service';
import { Subscription } from 'rxjs';
import { EstudianteState } from 'src/app/state/reducers/estudiante.reducers';

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
  // public tramiteSubTipos: any[] = [];
  // public tramiteSubTipoSelected: any = undefined;
  public tramite: any;
  private estudianteSubscriptions!: Subscription;

  public savedLoading: boolean = false;
  public adjunto: string = '';
  public cantidad: string = '';
  public fechaLimitedeEntrega: string = '';
  public fechaVencimiento: string = '';

  private tramiteSubscriptions!: Subscription;

  constructor(
    private store: Store<{ tramite: TramiteState, estudiante: EstudianteState, }>,
    private tramiteService: TramiteService,
    private messageService: MessageService
  ) {
    // this.tramiteService.GetListTramiteSubTipoSelected().then((response: any) => {
    //   this.tramiteSubTipos = response || [];
    // })

    this.tramiteService.GetListDocumentoTipoSelected().then((response: any) => {
      this.documentoTipos = response || [];
    })

    this.tramiteService.GetListDocumentoEstadoSelected().then((response: any) => {
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
        this.fechaVencimiento = this.documento.fechaVencimiento;
        this.cantidad = this.documento.cantidad;
        this.fechaLimitedeEntrega = this.documento.fechaLimitedeEntrega;

        // this.tramiteSubTipoSelected = { id: this.documento.id, nombre: this.documento.nombre };
        this.documentoTipoSelected = { id: this.documento.documentoTipoId, nombre: this.documento.nombreDocumentoTipo };
        this.documentoEstadoSelected = { id: this.documento.documentoEstadoId, nombre: this.documento.nombreDocumentoEstado };
        console.log(this.documento, "documentoform")
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
    const documento = {
      documentoTipoId: this.documentoTipoSelected.id,
      documentoEstadoId: this.documentoEstadoSelected.id,
      tramiteInscripcionCarreraId: this.tramite.id,
      tramiteSubTipoId: this.tramite.tramiteSubTipoId,
      cantidad: this.cantidad,
      // fechaRegistro: '',
      fechaLimitedeEntrega: this.fechaLimitedeEntrega,
      adjunto: this.adjunto,
      fechaVencimiento: this.fechaVencimiento
    }
    this.savedLoading = true;
    let response: any = null;
    if (this.documento) {
      const documento0 = { documentoInscripcioncarreraId: this.documento.documentoInscripcioncarreraId, ...documento };
      response = await this.tramiteService.PutDocumentoInscripcionCarrera(documento0);
      console.log(response, "responseUpdate");
      if (response) {
        this.savedLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
        return;
      }
    }
    else {
      response = await this.tramiteService.PostDocumentoInscripcionCarrera(documento);
      console.log(response, "responseSave");
      if (!response) {
        this.savedLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
        return;
      }
    }


    this.savedLoading = false;
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });

    this.store.dispatch(
      tramiteActions.addItemDocumento({ documento: documento })
    );
    this._clearForm();
  }

  _clearForm() {
    this.adjunto = '';
    this.cantidad = '';
    this.fechaLimitedeEntrega = '';
    this.fechaVencimiento = '';
  }
}
