import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';

import { Observable } from 'rxjs';

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
  ) {
    // this.permisoService.getPermisos()
    //   .then((responsePermisos) => {
    //     const permisos = responsePermisos || [];
    //     this.permisos = this._updateUbicacionUrl(permisos);
    //   })
  }

  async cargarPermisos() {
    console.log('permisos cargados', this.permisos);
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
    return true;
    console.log('buscando en permisos', this.permisos);

    for (let index = 0; index < this.permisos.length; index++) {
      const tareas = this.permisos[index].tareas ?? [];
      const permisoTarea = tareas.find(item => item.id == tareaId && item.tipo == tipoPermiso);
      if (permisoTarea !== undefined) return true;
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
