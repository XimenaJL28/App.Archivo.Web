import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../state/reducers/app.reducers';
import * as estudianteActions from '../../state/actions/estudiante.actions';
import * as tramiteActions from '../../state/actions/tramite.actions';

import { EstudianteService } from 'src/app/services/estudiante.service';
import { TramiteService } from '../../services/tramite.service';
import { EstudianteState } from 'src/app/state/reducers/estudiante.reducers';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss']
})
export class EstudianteComponent implements OnInit, OnDestroy {
  public estudianteEncontrados: any[] = [];
  public persona: any = {};

  public inscripciones: any[] = [];
  public inscripcion: any = {};
  public tramites: any[] = [];
  public tramite: any = {};

  public activeIndex = 0;

  private estudianteSubscriptions!: Subscription;

  constructor(
    private estudianteService: EstudianteService,
    private readonly TramiteService: TramiteService,
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
        this.activeIndex = tramiteActiveIndex;
      })
  }

  ngOnDestroy(): void {
    this.estudianteSubscriptions.unsubscribe();
  }

  async busqueda(event: any) {
    const response = await this.estudianteService.Searchperson(event.query);
    this.estudianteEncontrados = response || [];
  }

  buscarEstudianteSeleccionado(estudianteSeleccionado: any) {
    const estudiante = estudianteSeleccionado;
    estudiante.foto = estudianteSeleccionado.foto || 'https://portal.upds.edu.bo/index/images/usuario.jpg'

    this.store.dispatch(
      estudianteActions.setEstudiante({ estudiante: estudiante })
    )
    this.getinscripcions(estudiante.id)
  }

  async getinscripcions(idperson: any) {
    let responseInscripciones: any = await this.TramiteService.GetInscripcions(idperson);
    const inscripciones = responseInscripciones || [];

    this.store.dispatch(
      estudianteActions.setInscripciones({ inscripciones: inscripciones })
    )
  }

  async gettramites(inscripcion: any) {
    const response = await this.TramiteService.GetListTramites(inscripcion.idInscripcionSede);
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

  async gettramite(tramite: any, i: number) {
    this.store.dispatch(
      estudianteActions.setTramite({ tramite: tramite })
    )

    this.store.dispatch(
      estudianteActions.setTramiteActiveIndex({ index: i })
    )

    const response = await this.TramiteService.GetListDocumentos(tramite.id)
    const documentos = response || [];
    const response0 = await this.TramiteService.GetListDocumentoFaltante(tramite.id);
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

  _agruparTramites(tramitesListData: any[]) {
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