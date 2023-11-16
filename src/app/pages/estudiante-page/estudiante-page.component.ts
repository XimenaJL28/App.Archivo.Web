import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as estudianteActions from '../../state/actions/estudiante.actions';
import { EstudianteState } from '../../state/reducers/estudiante.reducers';

import { TramiteService } from '../../services/tramite.service';

import { Inscripcion, Persona, TramiteInscripcionCarrera, TramitesRealizados } from '../../interfaces/estudiante.interface';
import { PermisoGuard } from '../../guards/permiso.guard';

@Component({
  selector: 'app-estudiante-page',
  templateUrl: './estudiante-page.component.html',
  styleUrls: ['./estudiante-page.component.scss']
})
export class EstudiantePageComponent implements OnInit, OnDestroy {
  public persona?: Persona = undefined;
  public inscripciones: Inscripcion[] = [];
  public inscripcion?: Inscripcion = undefined;
  private estudianteSubscriptions!: Subscription;

  public tramites: TramitesRealizados[] = [];
  public tramite?: TramiteInscripcionCarrera = undefined;
  public tramiteActiveIndex: number = 0;

  public noTieneTramites: boolean = false;

  public canViewEstudiante: boolean = false;
  public canViewTramite: boolean = false;

  constructor(
    private readonly tramiteService: TramiteService,
    private readonly permisoGuard: PermisoGuard,
    private router: Router,
    private store: Store<{ estudiante: EstudianteState }>,
  ) { }

  ngOnInit(): void {
    this.canViewEstudiante = this.permisoGuard.canViewEstudiante();
    this.canViewTramite = this.permisoGuard.canViewTramite();

    this.estudianteSubscriptions = this.store.select('estudiante')
      .subscribe((state) => {
        this.persona = state.estudiante;
        this.inscripciones = state.inscripciones;
        this.inscripcion = state.inscripcion;

        this.tramites = state.tramites;
        this.tramite = state.tramite;
        this.tramiteActiveIndex = state.tramiteActiveIndex;
      })
  }

  ngOnDestroy(): void {
    this.estudianteSubscriptions.unsubscribe();
  }

  setEstudianteSeleccionado(persona: Persona): void {
    const estudiante: Persona = {
      ...persona,
      foto: persona.foto || 'https://portal.upds.edu.bo/index/images/usuario.jpg'
    }

    this.store.dispatch(
      estudianteActions.setEstudiante({ estudiante: estudiante })
    )
    this._getInscripciones(estudiante.id);
  }

  async _getInscripciones(estudianteId: number) {
    const responseInscripciones = await this.tramiteService.getInscripciones(estudianteId);
    const inscripciones = responseInscripciones || [];

    this.store.dispatch(
      estudianteActions.setInscripciones({ inscripciones: inscripciones })
    )
    this.noTieneTramites = false;
  }

  // Inscripciones del estudiante 
  async setInscripcionSeleccionada(inscripcion: Inscripcion) {
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

    this.noTieneTramites = tramitesOrdenados.length == 0;
  }

  _ordenarTramitesPorNombre(tramiteList: TramiteInscripcionCarrera[]): TramiteInscripcionCarrera[] {
    return tramiteList.sort((a: TramiteInscripcionCarrera, b: TramiteInscripcionCarrera) => {
      if (a.tramite < b.tramite) { return -1; }
      if (a.tramite > b.tramite) { return 1; }
      return 0;
    });
  }

  _agruparTramites(tramitesListData: TramiteInscripcionCarrera[]): TramitesRealizados[] {
    const tramitesList = this._ordenarTramitesPorNombre(tramitesListData);

    let tramitesGroup: TramitesRealizados[] = [];
    let index = 0;

    while (index < tramitesList.length) {
      let tramites: TramiteInscripcionCarrera[] = [];
      let cantidadDeTramites = 0;
      const nombreTramite = tramitesList[index].tramite;

      while (index < tramitesList.length && nombreTramite === tramitesList[index].tramite) {
        tramites.push(tramitesList[index]);
        cantidadDeTramites++;
        index++;
      }

      if (cantidadDeTramites > 0) {
        const item: TramitesRealizados = {
          nombreTramite,
          cantidadDeTramites,
          tramites
        };

        tramitesGroup.push(item);
      }
    }
    return tramitesGroup;
  }

  // Tramites pendientes del estudiante 
  async setTramiteSeleccionado(event: { tramite: TramiteInscripcionCarrera, index: number }) {
    const { tramite, index } = event;

    this.store.dispatch(
      estudianteActions.setTramite({ tramite: tramite })
    )

    this.store.dispatch(
      estudianteActions.setTramiteActiveIndex({ index: index })
    )
    this.router.navigate([`/tramite/inscripcion`]);
  }
}
