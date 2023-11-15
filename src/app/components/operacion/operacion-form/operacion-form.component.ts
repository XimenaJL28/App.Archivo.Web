import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { TramiteState } from '../../../state/reducers/tramite.reducers';
import { UserState } from '../../../state/reducers/user.reducer';
import * as tramiteActions from '../../../state/actions/tramite.actions';

import { TramiteService } from '../../../services/tramite.service';

import { DocumentoInscripcionCarrera, DropDownItem } from '../../../interfaces/estudiante.interface';
import { DocumentoOperacionSave } from '../../../interfaces/tramite.interface';

@Component({
  selector: 'app-operacion-form',
  templateUrl: './operacion-form.component.html',
  styleUrls: ['./operacion-form.component.scss'],
  providers: [MessageService],
})
export class OperacionFormComponent implements OnInit {
  @Input() documento?: DocumentoInscripcionCarrera = undefined;
  @Input() user?: UserState = undefined;
  @Output() cerrarDialogModal: EventEmitter<void> = new EventEmitter();

  public documentoOperacionTipos: DropDownItem[] = [];
  public documentoOperacionTipoSelected?: DropDownItem = undefined;
  public fechaOperacion: string = '';
  public nombreFuncionario: string = '';
  public adjunto: string = '';
  public descripcion: string = '';

  public savedLoading: boolean = false;

  private userSubscriptions!: Subscription;

  constructor(
    private tramiteService: TramiteService,
    private messageService: MessageService,
    private store: Store<{ tramite: TramiteState, user: UserState }>,
  ) { }

  ngOnInit(): void {
    this.tramiteService.getDropDownDocumentoOperacionTipo().then((response: any) => {
      this.documentoOperacionTipos = response || [];
    });

    this.userSubscriptions = this.store.select('user').subscribe(state => {
      this.user = state;
      this.nombreFuncionario = this._getNombreFuncionario();
    })
  }

  ngOnDestroy(): void {
    this.userSubscriptions.unsubscribe();
  }

  setUri(uri: string): void {
    this.adjunto = uri;
  }

  async guardarOperacion() {
    this.savedLoading = true;

    // validacion de datos
    if (this.adjunto.trim().length < 1 ||
      !this.user ||
      this.descripcion.trim().length < 1 ||
      !this.documentoOperacionTipoSelected ||
      !this.documento
    ) {
      this.messageService.add({ severity: 'error', summary: 'Datos Inválidos', detail: 'Revisar valores insertados' });
      this.savedLoading = false;
      return;
    }

    const operacionDTO: DocumentoOperacionSave = {
      documentoInscripcionCarreraId: this.documento.documentoInscripcioncarreraId,
      funcionarioId: this.user.id,
      documentoOperacionTipoId: this.documentoOperacionTipoSelected.id,
      descripcion: this.descripcion,
      adjunto: this.adjunto,
      estado: true
    }

    const response = await this.tramiteService.postDocumentoOperacion(operacionDTO);
    if (!response) {
      this.savedLoading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Se produjo un error al guardar' });
      return;
    }

    const responseOperaciones = await this.tramiteService.getListOperaciones(this.documento.documentoInscripcioncarreraId);
    const operaciones = responseOperaciones || [];

    this.store.dispatch(
      tramiteActions.setOperaciones({ operaciones: operaciones })
    );

    this.savedLoading = false;

    this.fechaOperacion = '';
    this.adjunto = '';
    this.descripcion = '';
    this.cerrarDialogModal.emit();
  }

  _getNombreFuncionario(): string {
    return this.user ? `${this.user.nombre} ${this.user.primerApellido} ${this.user.segundoApellido}` : 'desconocido';
  }
}
