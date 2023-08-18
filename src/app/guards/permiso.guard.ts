import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserState } from '../state/reducers/user.reducer';

import { RBAC } from '../models/permiso';

@Injectable({
    providedIn: 'root'
})
export class PermisoGuard implements CanActivate, CanActivateChild, CanLoad {
    private rol: string = '';

    constructor(
        private store: Store<{ user: UserState, }>,
    ) {
        this.store.select('user').subscribe(state => {
            //this.rol = state.cargoNombre;
            this.rol = localStorage.getItem('Role') || 'student';

            // el estudiante no puede editar un DocumentoFormComponent, ni ver el listado de tramites, Plantilla 
            // el admin tiene acceso a todo
            this.rol = 'admin';
            // this.rol = 'student';
            console.log(state);

        })
    }

    getPermisoRuta(route: string): boolean {
        const permisoRol = RBAC.find(item => item.rol == this.rol);
        if (!permisoRol) return false;
        return permisoRol.rutas.includes(route);
    }

    getPermisoRutaHija(routeChild: string): boolean {
        const permisoRol = RBAC.find(item => item.rol == this.rol);
        if (!permisoRol) return false;
        if (!permisoRol.rutasHijas) return false;

        return permisoRol.rutasHijas.includes(routeChild);
    }

    getPermisoComponente(componente: string, funcion: string): boolean {
        const permisoRol = RBAC.find(permiso => permiso.rol == this.rol);
        if (!permisoRol) return false;
        if (!permisoRol.componentes) return false;

        const funciones = permisoRol.componentes.find(item => item.nombre = componente);
        if (!funciones) return false;
        return funciones.funciones.includes(funcion);
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
}