import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/reducers/app.reducers';
import * as tramiteActions from '../../state/actions/tramite.actions';

import { TramiteService } from 'src/app/services/tramite.service';
import { TramiteState } from 'src/app/state/reducers/tramite.reducers';
import { EstudianteState } from 'src/app/state/reducers/estudiante.reducers';

@Component({
  selector: 'app-documento-inscripcion',
  templateUrl: './documento-inscripcion.component.html',
  styleUrls: ['./documento-inscripcion.component.scss']
})
export class DocumentoInscripcionComponent implements OnInit, OnDestroy {
  public tramite: any;
  public documentos: any[] = [];
  public documento: any;
  public operaciones: any[] = [];
  public operacion: any;

  private tramiteSubscriptions!: Subscription;
  private estudianteSubscriptions!: Subscription;

  constructor(
    private store: Store<{ estudiante: EstudianteState, tramite: TramiteState }>,
    private tramiteService: TramiteService,
    private router: Router) { }

  ngOnInit(): void {
    this.estudianteSubscriptions = this.store.select('estudiante').subscribe(state => {
      this.tramite = state.tramite;
    })

    this.tramiteSubscriptions = this.store.select('tramite').subscribe(state => {
      this.documentos = state.documentos;
      this.documento = state.documento;
      this.operaciones = state.operaciones;
      this.operacion = state.operacion;
      console.log(this.documentos);
    })
  }

  ngOnDestroy(): void {
    this.tramiteSubscriptions.unsubscribe();
    this.estudianteSubscriptions.unsubscribe();
  }

  async getOperaciones(documento: any) {
    this.store.dispatch(
      tramiteActions.setDocumento({ documento: documento })
    );

    const response = await this.tramiteService.GetListOperaciones(documento.documentoInscripcioncarreraId);
    const operaciones = response || [];
    this.store.dispatch(
      tramiteActions.setOperaciones({ operaciones: operaciones })
    )
  }

  getoperacion(operacion: any) {
    this.store.dispatch(
      tramiteActions.setOperacion({ operacion: operacion })
    )

    this.router.navigate([`/tramite/operacion`]);
  }
}
