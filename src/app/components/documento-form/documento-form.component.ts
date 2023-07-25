import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { EstudianteState } from '../../state/reducers/estudiante.reducers';
import { TramiteState } from '../../state/reducers/tramite.reducers';
import * as tramiteActions from '../../state/actions/tramite.actions';

import { TramiteService } from '../../services/tramite.service';

import { DocumentoInscripcionCarrera, DocumentoInscripcionCarreraFaltantes, DocumentoInscripcionCarreraSave, DocumentoInscripcionCarreraUpdate, DropDownItem } from '../../interfaces/estudiante.interface';
import { TramiteInscripcionCarrera } from '../../interfaces/estudiante.interface';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-documento-form',
  templateUrl: './documento-form.component.html',
  styleUrls: ['./documento-form.component.scss'],
  providers: [MessageService],
})
export class DocumentoFormComponent implements OnInit {
  @Input() isUpdated: boolean = false;
  @Output() cerrarDialogModal:EventEmitter<void> = new EventEmitter();

  public documentoInscripcionCarreraFaltante?: DocumentoInscripcionCarreraFaltantes = undefined;
  public documentoInscripcionCarrera?: DocumentoInscripcionCarrera = undefined;

  public documentoEstados: DropDownItem[] = [];
  public documentoEstadoSelected?: DropDownItem = undefined;
  public tramite?: TramiteInscripcionCarrera = undefined;

  public savedLoading: boolean = false;
  public nombreDocumentoTipo: string = '';
  public documentoTipoId: number = 0;

  public adjunto: string = '';
  public cantidad: number = 0;
  public fechaLimitedeEntrega: Date | undefined;
  public fechaVencimiento: Date | undefined;

  public dateFormat: string = 'dd-mm-yy'

  private estudianteSubscriptions!: Subscription;
  private tramiteSubscriptions!: Subscription;

  constructor(
    private store: Store<{ tramite: TramiteState, estudiante: EstudianteState, }>,
    private tramiteService: TramiteService,
    private messageService: MessageService
  ) {
    this.tramiteService.getDropDownDocumentoEstado().then((response: any) => {
      this.documentoEstados = response || [];
    })
  }

  ngOnInit(): void {
    this.estudianteSubscriptions = this.store.select('estudiante').subscribe(state => {
      this.tramite = state.tramite;
    })

    this.tramiteSubscriptions = this.store.select('tramite').subscribe(state => {
      this.documentoInscripcionCarreraFaltante = state.documentoFaltante;
      this.documentoInscripcionCarrera = state.documento;

      if (!this.isUpdated && this.documentoInscripcionCarreraFaltante) {
        this.documentoTipoId = this.documentoInscripcionCarreraFaltante.documentoTipoId;
        this.nombreDocumentoTipo = this.documentoInscripcionCarreraFaltante.nombreDocumentoTipo;
      }

      if (this.isUpdated && this.documentoInscripcionCarrera) {
        this.documentoTipoId = this.documentoInscripcionCarrera.documentoTipoId;
        this.nombreDocumentoTipo = this.documentoInscripcionCarrera?.nombreDocumentoTipo || '';

        this.fechaVencimiento = this._stringToDate(this.documentoInscripcionCarrera.fechaVencimiento || '');
        this.fechaLimitedeEntrega = this._stringToDate(this.documentoInscripcionCarrera.fechaLimitedeEntrega);
        this.cantidad = this.documentoInscripcionCarrera.cantidad;
        this.adjunto = this.documentoInscripcionCarrera.adjunto || '';

        this.documentoEstadoSelected = { id: this.documentoInscripcionCarrera.documentoEstadoId, nombre: this.documentoInscripcionCarrera.nombreDocumentoEstado || '' };
      }
    })
  }

  ngOnDestroy(): void {
    this.estudianteSubscriptions.unsubscribe();
    this.tramiteSubscriptions.unsubscribe();
  }

  setUri(uri: string): void {
    this.adjunto = uri;
  }

  async guardarDocumento() {
    if (!this.isUpdated && this.documentoInscripcionCarreraFaltante) {
      console.log('save')
      await this._crearDocumento()
    }

    if (this.isUpdated && this.documentoInscripcionCarrera) {
      console.log('update')
      await this._actualizarDocumento()
    }
  }

  async _crearDocumento() {
    this.savedLoading = true;

    if (this.adjunto.trim().length < 1 ||
      !this.fechaLimitedeEntrega ||
      !this.fechaVencimiento ||
      !this.documentoEstadoSelected ||
      !this.tramite) {
      this.messageService.add({ severity: 'error', summary: 'Datos no validos', detail: 'Revisar valores insertados' });
      this.savedLoading = false;
      return;
    }

    const documentoDTO: DocumentoInscripcionCarreraSave = {
      documentoTipoId: this.documentoTipoId,
      documentoEstadoId: this.documentoEstadoSelected.id,
      tramiteInscripcionCarreraId: this.tramite.id,
      tramiteSubTipoId: this.documentoInscripcionCarreraFaltante?.tramiteSubTipoId || 0,
      cantidad: this.cantidad,
      fechaLimiteEntrega: this._dateToString(this.fechaLimitedeEntrega),
      adjunto: this.adjunto,
      fechaVencimiento: this._dateToString(this.fechaVencimiento),
      documentoTipoEstado: true,
      fechaRegistro: this._dateToString(new Date()),
    }

    const response = await this.tramiteService.postDocumentoInscripcionCarrera(documentoDTO);

    if (!response) {
      // console.log('saved error')
      this.savedLoading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
      return;
    }

    console.log('saved ok')
    await this._loadDocumentoInscripcionCarrera(this.tramite.id, documentoDTO.tramiteSubTipoId);
    // this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Guardado Exitosamente' });
    this.savedLoading = false;
    this.cerrarDialogModal.emit();
  }

  async _actualizarDocumento() {
    this.savedLoading = true;

    if (this.adjunto.trim().length < 1 ||
      !this.fechaLimitedeEntrega ||
      !this.fechaVencimiento ||
      !this.documentoEstadoSelected ||
      !this.tramite) {
      this.messageService.add({ severity: 'error', summary: 'Datos no validos', detail: 'Revisar valores insertados' });
      this.savedLoading = false;
      return;
    }

    const documentoDTO: DocumentoInscripcionCarreraUpdate = {
      documentoInscripcionCarreraId: this.documentoInscripcionCarrera?.documentoInscripcioncarreraId || 0,
      documentoEstadoId: this.documentoEstadoSelected.id,
      cantidad: this.cantidad,
      fechaLimitedeEntrega: this._dateToString(this.fechaLimitedeEntrega),
      adjunto: this.adjunto,
      fechaVencimiento: this._dateToString(this.fechaVencimiento),
    }

    const response = await this.tramiteService.putDocumentoInscripcionCarrera(documentoDTO);

    if (!response) {
      this.savedLoading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo efectuar cambios' });
      console.log('updated error')
      return;
    }
    // this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Actualizado Correctamente' });

    console.log('updated ok')
    await this._loadDocumentoInscripcionCarrera(
      this.tramite.id,
      this.documentoInscripcionCarrera?.tramiteSubTipoId || 0
    );

    this.savedLoading = false;
    this.cerrarDialogModal.emit();
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

  _dateToString(date: Date | undefined): string {
    return date ? date.toISOString() : '';
  }

  async _loadDocumentoInscripcionCarrera(tramiteId: number, tramiteSubTipoId: number) {
    const responseDocumentos = await this.tramiteService.getListDocumentos(tramiteId, tramiteSubTipoId)
    const documentos = responseDocumentos || [];

    const responseDocumentoFaltantes = await this.tramiteService.getListDocumentoFaltante(tramiteId, tramiteSubTipoId);
    const documentosFaltantes = responseDocumentoFaltantes || [];

    this.store.dispatch(
      tramiteActions.setDocumentos({ documentos: documentos, documentosFaltantes: documentosFaltantes })
    );
  }
}
