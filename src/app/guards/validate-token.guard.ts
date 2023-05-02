import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate{

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validateToken(state);
  }

  validateToken(state: RouterStateSnapshot){
    const hasToken = localStorage.getItem("Authorization") != null ? true: false;

    if(!hasToken) this.router.navigateByUrl(`/login?next=${state.url}`);

    return hasToken;
  }
}
