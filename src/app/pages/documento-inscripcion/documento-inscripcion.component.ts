import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as tramiteActions from '../../state/actions/tramite.actions';
import { EstudianteState } from '../../state/reducers/estudiante.reducers';
import { TramiteState } from '../../state/reducers/tramite.reducers';

import { TramiteService } from '../../services/tramite.service';

@Component({
  selector: 'app-documento-inscripcion',
  templateUrl: './documento-inscripcion.component.html',
  styleUrls: ['./documento-inscripcion.component.scss'],
})
export class DocumentoInscripcionComponent implements OnInit, OnDestroy {
  public tramite: any = undefined;
  public documentos: any[] = [];
  public documento: any = undefined;
  public operaciones: any[] = [];
  public operacion: any = undefined;

  public visibleDocumentoSave: boolean = false;
  public visibleDocumentoUpdate: boolean = false;
  public visibleOperacion: boolean = false;

  private tramiteSubscriptions!: Subscription;
  private estudianteSubscriptions!: Subscription;

  constructor(
    private store: Store<{ estudiante: EstudianteState, tramite: TramiteState }>,
    private tramiteService: TramiteService,
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

  async getOperaciones(documento: any) {
    const response = await this.tramiteService.getListOperaciones(documento.documentoInscripcioncarreraId);
    const operaciones = response || [];

    this.store.dispatch(
      tramiteActions.setDocumento({ documento: documento, operaciones: operaciones })
    );
  }

  getOperacion(operacion: any) {
    this.store.dispatch(
      tramiteActions.setOperacion({ operacion: operacion })
    )

    this.visibleOperacion = true;
  }

  nuevoDocumento() {
    this.visibleDocumentoSave = true;
  }

  async editarDocumento(documento: any) {
    this.getOperaciones(documento).then(() => {
      this.visibleDocumentoUpdate = true;
    })
  }

  setColorDocumentoEstado(documento: any) {
    switch (documento.nombreDocumentoEstado) {
      case 'Inactivo':
        return 'success';
      case 'Activo':
        return 'warning';
      case 'Reprogramado':
        return 'danger';
      default:
        return 'info'
    }
  }
}
