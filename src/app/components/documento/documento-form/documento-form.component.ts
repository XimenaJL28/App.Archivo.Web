import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EventEmitter, Output } from '@angular/core';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { EstudianteState } from '../../../state/reducers/estudiante.reducers';
import { TramiteState } from '../../../state/reducers/tramite.reducers';
import * as tramiteActions from '../../../state/actions/tramite.actions';

import { TramiteService } from '../../../services/tramite.service';

import { DocumentoInscripcionCarrera, DocumentoInscripcionCarreraFaltantes, DocumentoInscripcionCarreraSave, DocumentoInscripcionCarreraUpdate, DropDownItem } from '../../../interfaces/estudiante.interface';
import { TramiteInscripcionCarrera } from '../../../interfaces/estudiante.interface';
import { UserState } from 'src/app/state/reducers/user.reducer';
import { DocumentoOperacionSave } from '../../../interfaces/tramite.interface';

@Component({
  selector: 'app-documento-form',
  templateUrl: './documento-form.component.html',
  styleUrls: ['./documento-form.component.scss'],
  providers: [MessageService],
})
export class DocumentoFormComponent implements OnInit {
  @Output() cerrarDialogModal: EventEmitter<void> = new EventEmitter();

  // operaciones
  public user?: UserState = undefined;
  public documentoOperacionTipos: DropDownItem[] = [];
  public documentoOperacionTipoSelected?: DropDownItem = undefined;
  public nombreFuncionario: string = '';
  public descripcion: string = '';
  public adjuntoOperacion: string = '';
  private userSubscriptions!: Subscription;
  
  // documento
  public documentoInscripcionCarrera?: DocumentoInscripcionCarrera = undefined;

  public tramite?: TramiteInscripcionCarrera = undefined;

  public savedLoading: boolean = false;
  public nombreDocumentoTipo: string = '';
  public documentoTipoId: number = 0;
  public isDocumentoIndefinido: boolean = false;

  public adjunto: string = '';
  public cantidad: number = 0;
  public fechaLimitedeEntrega: Date | undefined;
  public fechaVencimiento: Date | undefined;

  public dateFormat: string = 'dd-mm-yy'

  private estudianteSubscriptions!: Subscription;
  private tramiteSubscriptions!: Subscription;

  constructor(
    private store: Store<{ tramite: TramiteState, estudiante: EstudianteState, user: UserState, }>,
    private tramiteService: TramiteService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.tramiteService.getDropDownDocumentoOperacionTipo().then((response: any) => {
      this.documentoOperacionTipos = response || [];
    });

    this.userSubscriptions = this.store.select('user').subscribe(state => {
      this.user = state;
      this.nombreFuncionario = this._getNombreFuncionario();
    })

    this.estudianteSubscriptions = this.store.select('estudiante').subscribe(state => {
      this.tramite = state.tramite;
    })

    this.tramiteSubscriptions = this.store.select('tramite').subscribe(state => {
      this.documentoInscripcionCarrera = state.documento;


      if (this.documentoInscripcionCarrera) {
        this.documentoTipoId = this.documentoInscripcionCarrera.documentoTipoId;
        this.nombreDocumentoTipo = this.documentoInscripcionCarrera?.nombreDocumentoTipo || '';

        this.fechaVencimiento = this._stringToDate(this.documentoInscripcionCarrera.fechaVencimiento || '');
        this.fechaLimitedeEntrega = this._stringToDate(this.documentoInscripcionCarrera.fechaLimitedeEntrega);
        this.cantidad = this.documentoInscripcionCarrera.cantidad;
        this.adjunto = this.documentoInscripcionCarrera.adjunto || '';

        this.isDocumentoIndefinido = !this.getDocumentoIndefinido();
      }
    })
  }

  ngOnDestroy(): void {
    this.tramiteSubscriptions.unsubscribe();
    this.estudianteSubscriptions.unsubscribe();
    this.userSubscriptions.unsubscribe();
  }

  getDocumentoIndefinido(): boolean {
    // es fecha null
    const nombreDocumento = this.documentoInscripcionCarrera?.nombreDocumentoTipo || '';
    // console.log(nombreDocumento, "ci");
    // console.log(this.documentoInscripcionCarrera?.fechaVencimiento, "fecha");
    //this.isDocumentoIndefinido = !documentoInscripcionCarrera.fechaVencimiento && nombreDocumento !== 'CEDULA DE IDENTIDAD - FOTOCOPIA SIMPLE VIGENTE';
    return nombreDocumento === 'CEDULA DE IDENTIDAD - FOTOCOPIA SIMPLE VIGENTE';
  }

  setUri(uri: string): void {
    this.adjunto = uri;
  }

  setUriOperacion(uri:string):void {
    this.adjuntoOperacion = uri;
  }

  async guardarDocumento() {
    this.savedLoading = true;

    // documento
    if (this.adjunto.trim().length < 1 ||
      !this.fechaLimitedeEntrega ||
      (!this.fechaVencimiento && this.getDocumentoIndefinido()) ||
      !this.tramite) {
      this.messageService.add({ severity: 'error', summary: 'Datos no validos', detail: 'Revisar valores del documento' });
      this.savedLoading = false;
      return;
    }

    // operacion
    if (
      // this.adjuntoOperacion.trim().length < 1 ||
      !this.user ||
      this.descripcion.trim().length < 1 ||
      !this.documentoOperacionTipoSelected ||
      !this.documentoInscripcionCarrera
    ) {
      this.messageService.add({ severity: 'error', summary: 'Datos no válidos', detail: 'Revisar valores de la operación' });
      this.savedLoading = false;
      return;
    }

    const documentoInscripcioncarreraId = this.documentoInscripcionCarrera?.documentoInscripcioncarreraId || 0;
    // documento
    const documentoDTO: DocumentoInscripcionCarreraUpdate = {
      documentoInscripcionCarreraId: documentoInscripcioncarreraId,
      cantidad: this.cantidad,
      fechaLimitedeEntrega: this._dateToString(this.fechaLimitedeEntrega),
      adjunto: this.adjunto,
      fechaVencimiento: this._dateToString(this.fechaVencimiento),
    }

    // operacion
    const operacionDTO: DocumentoOperacionSave = {
      documentoInscripcionCarreraId: documentoInscripcioncarreraId,
      funcionarioId: this.user.id,
      documentoOperacionTipoId: this.documentoOperacionTipoSelected.id,
      descripcion: this.descripcion,
      adjunto: this.adjuntoOperacion,
      estado: true
    }

    // Operacion
    const responseOperacion = await this.tramiteService.postDocumentoOperacion(operacionDTO);
    if (!responseOperacion) {
      this.savedLoading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha sucedido una excepción al guardar operación' });
      return;
    }


    const response = await this.tramiteService.putDocumentoInscripcionCarrera(documentoDTO);
    if (!response) {
      this.savedLoading = false;
      this.messageService.add({ severity: 'error', summary: 'Verificar Datos', detail: 'Ha sucedido una excepción al modificar documento' });
      return;
    }

    // si al actualiza documento hay error, eliminar la operacion


    // documentos
    const responseDocumentos = await this.tramiteService.getListDocumentos(this.tramite.id,
      this.documentoInscripcionCarrera?.tramiteSubTipoId || 0)
    const documentos = responseDocumentos || [];

    this.store.dispatch(
      tramiteActions.setDocumentos({ documentos: documentos, documentosFaltantes: [] })
    );

    // operaciones
    const responseOperaciones = await this.tramiteService.getListOperaciones(documentoInscripcioncarreraId);
    const operaciones = responseOperaciones || [];

    this.store.dispatch(
      tramiteActions.setOperaciones({ operaciones: operaciones })
    );

    this.adjunto = '';
    this.adjuntoOperacion ='';
    this.descripcion = '';

    this.savedLoading = false;
    this.cerrarDialogModal.emit();
  }

  _stringToDate(date: string): Date | undefined {
    return date ? new Date(date) : undefined;
  }

  _dateToString(date: Date | undefined): string {
    return date ? date.toISOString() : '';
  }


  _getNombreFuncionario(): string {
    return this.user ? `${this.user.nombre} ${this.user.primerApellido} ${this.user.segundoApellido}` : 'desconocido';
  }
}
