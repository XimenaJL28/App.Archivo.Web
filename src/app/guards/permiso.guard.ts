import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserState } from '../state/reducers/user.reducer';

import { moduloIdEnlace } from '../models/permiso';
import { PermisosService } from '../services/permisos.service';
import { Permiso, PermisoUsuario, Tarea } from '../interfaces/permiso.interface';

@Injectable({
  providedIn: 'root'
})
export class PermisoGuard implements CanActivate, CanActivateChild, CanLoad {
  public permisos: Permiso[] = [];

  constructor(
    private permisoService: PermisosService,
    private router: Router,
    private store: Store<{ user: UserState, }>,
  ) {
    this.store.select('user').subscribe(state => {
      //this.rol = state.cargoNombre;
      //this.rol = localStorage.getItem('Role') || 'student';
      //this.rol = 'student';Estudiante

      this.permisoService.getPermisos()
        .then((responsePermisos) => {
          const permisos = responsePermisos || [];
          this.permisos = this._updateUbicacionUrl(permisos);
        });

      this.permisoService.getPermiso('id or rol')
        .then((responsePermisos) => {
          const permisosUsuario = responsePermisos || [];
          this._setPermisosDeUsuario(permisosUsuario);

          console.log(this.permisos);
        });
    });


  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.getPermisoRuta(state.url);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.getPermisoRutaHija(state.url);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  getPermisoRuta(route: string): boolean {
    return this.permisos.find(item => item.ubicacion == route) !== undefined;
  }

  getPermisoRutaHija(routeChild: string): boolean {
    return this.permisos.find(item => item.ubicacion == routeChild) !== undefined;
  }

  canViewEstudiante(): boolean {
    return this._existePermiso(51200, 2);
  }

  canViewTramite(): boolean {
    return this._existePermiso(51201, 2);
  }

  canViewDocumento(): boolean {
    return this._existePermiso(51202, 2);
  }

  canEditDocumento(): boolean {
    return this._existePermiso(51203, 3);
  }

  canViewPlantilla(): boolean {
    return this._existePermiso(51204, 2);
  }

  canEditPlantilla(): boolean {
    return this._existePermiso(51205, 3);
  }

  canViewOperacion(): boolean {
    return this._existePermiso(51206, 2);
  }

  _updateUbicacionUrl(permisos: Permiso[]): Permiso[] {
    return permisos.map(item => {
      return {
        ...item, ubicacion: moduloIdEnlace.find(index => index.id == item.id)?.enlace || ''
      }
    })
  }

  _existePermiso(tareaId: number, tipoPermiso: number): boolean {
    for (let index = 0; index < this.permisos.length; index++) {
      const tareas = this.permisos[index].tareas ?? [];
      const permisoTarea = tareas.find(item => item.tipo == tipoPermiso && item.id == tareaId);

      if (permisoTarea) return true;
    }

    return false;
  }

  _setPermisosDeUsuario(permisosUsuario: PermisoUsuario[]): void {
    let permisosTemp: Permiso[] = [];

    permisosUsuario.forEach(permiso => {
      const permisoItem = this.permisos.find(item => item.id == permiso.id);
      if (permisoItem) {
        const tareasItem = permisoItem.tareas || [];
        let tareasTemp: Tarea[] = [];
        permiso.tareas.forEach(tarea => {
          const tareaItem = tareasItem.find(item => item.id == tarea.id && item.tipo == tarea.tipo);
          if (tareaItem) {
            tareasTemp.push(tareaItem);
          }
        })

        if (tareasTemp.length > 0)
          permisosTemp.push({ ...permisoItem, tareas: tareasTemp });
      }
    })

    if (permisosUsuario.length > 0) this.permisos = [...permisosTemp];
  }
}
