import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { EstudianteState } from '../../state/reducers/estudiante.reducers';
import { TramiteState } from '../../state/reducers/tramite.reducers';
import * as tramiteActions from '../../state/actions/tramite.actions';

import { DocumentoInscripcionCarrera, DocumentoInscripcionCarreraFaltantes, Inscripcion, Persona, TramiteInscripcionCarrera } from 'src/app/interfaces/estudiante.interface';

import { setColorDocumentoEstado } from '../../utils/color';
import { MessageService } from 'primeng/api';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-tramite-inscripcion',
  templateUrl: './tramite-inscripcion.component.html',
  providers: [MessageService],
  styleUrls: ['./tramite-inscripcion.component.scss']
})
export class TramiteInscripcionComponent implements OnInit, OnDestroy {
  public tramite?: TramiteInscripcionCarrera = undefined;
  public estudiante?: Persona = undefined;
  public inscripcion?: Inscripcion = undefined;
  public documentos: DocumentoInscripcionCarrera[] = [];
  public documentosFaltantes: DocumentoInscripcionCarreraFaltantes[] = [];

  public visibleDocumentoSave: boolean = false;

  private estudianteSubscriptions!: Subscription;
  private tramiteSubscriptions!: Subscription;

  constructor(
    private store: Store<{ estudiante: EstudianteState, tramite: TramiteState }>,
    private router: Router,
    private messageService: MessageService,
    private readonly MainService: MainService
  ) { }

  ngOnInit(): void {
    this.estudianteSubscriptions = this.store.select('estudiante').subscribe(state => {
      this.estudiante = state.estudiante;
      this.inscripcion = state.inscripcion;
      this.tramite = state.tramite;
    })

    this.tramiteSubscriptions = this.store.select('tramite').subscribe(state => {
      this.documentos = state.documentos;
      this.documentosFaltantes = state.documentosFaltantes;
    })
  }

  ngOnDestroy(): void {
    this.tramiteSubscriptions.unsubscribe();
    this.estudianteSubscriptions.unsubscribe();
  }

  getColorDocumentoEstado(documento: DocumentoInscripcionCarrera): string {
    return setColorDocumentoEstado(documento);
  }

  async nuevoDocumento(documento: DocumentoInscripcionCarreraFaltantes) {
    this.store.dispatch(
      tramiteActions.setDocumentoFaltante({ documentoFaltante: documento })
    )
    this.visibleDocumentoSave = true;
  }

  cerrarDialogModal():void {
    this.visibleDocumentoSave = false;
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Guardado Exitosamente' });
    // this.MainService.mostrarToast({ severity: 'success', summary: 'Saved', detail: 'Guardado Exitosamente' });
  }
}
