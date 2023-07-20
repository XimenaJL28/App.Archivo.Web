import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as estudianteActions from '../../state/actions/estudiante.actions';
import * as tramiteActions from '../../state/actions/tramite.actions';
import { EstudianteState } from '../../state/reducers/estudiante.reducers';

import { EstudianteService } from '../../services/estudiante.service';
import { TramiteService } from '../../services/tramite.service';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss']
})
export class EstudianteComponent implements OnInit, OnDestroy {
  public estudianteEncontrados: any[] = [];
  public persona: any = undefined;

  public inscripciones: any[] = [];
  public inscripcion: any = undefined;
  public tramites: any[] = [];
  public tramite: any = undefined;
  public tramiteActiveIndex = 0;

  private estudianteSubscriptions!: Subscription;

  constructor(
    private readonly estudianteService: EstudianteService,
    private readonly tramiteService: TramiteService,
    private store: Store<{ estudiante: EstudianteState }>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.estudianteSubscriptions = this.store.select('estudiante')
      .subscribe(({ estudiante, inscripciones, inscripcion, tramites, tramite, tramiteActiveIndex }) => {
        this.persona = estudiante;
        this.inscripciones = inscripciones
        this.inscripcion = inscripcion;

        this.tramites = tramites;
        this.tramite = tramite;
        this.tramiteActiveIndex = tramiteActiveIndex;
      })
  }

  ngOnDestroy(): void {
    this.estudianteSubscriptions.unsubscribe();
  }

  async buscarEstudiante(event: any) {
    const textSearch = event.query.trim() as string;
    if (textSearch.length === 0) {
      return;
    }

    const response = await this.estudianteService.buscarEstudiante(textSearch);
    this.estudianteEncontrados = response || [];
  }

  setEstudianteSeleccionado(estudianteSeleccionado: any) {
    const estudiante = {
      ...estudianteSeleccionado,
      foto: estudianteSeleccionado.foto || 'https://portal.upds.edu.bo/index/images/usuario.jpg'
    }

    this.store.dispatch(
      estudianteActions.setEstudiante({ estudiante: estudiante })
    )
    this._getInscripciones(estudiante.id)
  }

  async _getInscripciones(estudianteId: number) {
    let responseInscripciones: any = await this.tramiteService.getInscripciones(estudianteId);
    const inscripciones = responseInscripciones || [];

    this.store.dispatch(
      estudianteActions.setInscripciones({ inscripciones: inscripciones })
    )
  }

  async getTramites(inscripcion: any) {
    const response = await this.tramiteService.getListTramites(inscripcion.idInscripcionSede);
    const tramites = response || [];
    const tramitesOrdenados = this._agruparTramites(tramites);

    this.store.dispatch(
      estudianteActions.setTramites(
        { tramites: tramitesOrdenados, inscripcion: inscripcion }
      )
    )

    this.store.dispatch(
      estudianteActions.setTramiteActiveIndex({ index: -1 })
    )
  }

  async getTramite(tramite: any, index: number) {
    this.store.dispatch(
      estudianteActions.setTramite({ tramite: tramite })
    )

    this.store.dispatch(
      estudianteActions.setTramiteActiveIndex({ index: index })
    )

    const response = await this.tramiteService.getListDocumentos(tramite.id, tramite?.subTipoTramiteId || 1)
    const documentos = response || [];

    const response0 = await this.tramiteService.getListDocumentoFaltante(tramite.id, tramite?.subTipoTramiteId || 1);
    const documentosFaltantes = response0 || [];

    this.store.dispatch(
      tramiteActions.setDocumentos({ documentos: documentos, documentosFaltantes: documentosFaltantes })
    );

    this.router.navigate([`/tramite/inscripcion`]);
  }

  _ordenarTramitesPorNombre(tramiteList: any[]): any[] {
    return tramiteList.sort((a: any, b: any) => {
      if (a.tramite < b.tramite) { return -1; }
      if (a.tramite > b.tramite) { return 1; }
      return 0;
    });
  }

  _agruparTramites(tramitesListData: any[]): any[] {
    const tramitesList = this._ordenarTramitesPorNombre(tramitesListData);

    let tramitesGroup: any[] = [];
    let index = 0;

    while (index < tramitesList.length) {
      let tramites: any[] = [];
      let cantidadDeTramites = 0;
      const nombreTramite = tramitesList[index].tramite;

      while (index < tramitesList.length && nombreTramite === tramitesList[index].tramite) {
        tramites.push(tramitesList[index]);
        cantidadDeTramites++;
        index++;
      }

      if (cantidadDeTramites > 0) {
        const item = {
          nombreTramite,
          cantidadDeTramites,
          tramites
        };

        tramitesGroup.push(item);
      }
    }
    return tramitesGroup;
  }
}
