import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MainService } from 'src/app/services/main.service';

//? Theme state management
import { toggleTheme } from 'src/app/state/actions/theme.actions';
import { ThemeState } from 'src/app/state/reducers/theme.reducer';
import { UserState } from 'src/app/state/reducers/user.reducer';

/**
 * menu lateral
 */

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  //? Funcionario
  userState$: Observable<UserState>;
  themeState$: Observable<ThemeState>;

  @Input() menus: any[] = [];
  currentDate = new Date();


  /* *Persona que esta logeada */
  persona: any = {}
  funcionario: any = {};





  constructor(

    private readonly router: Router,
    private readonly mainService: MainService,
    private readonly store: Store<{ theme: ThemeState, user: UserState }>) {

    this.themeState$ = this.store.select("theme");
    this.userState$ = this.store.select("user");

    this.userState$.subscribe(user => this.funcionario = user);

    this.persona = mainService.persona;

  }

  ngOnInit(): void {
  }

  /**
   * Cerrar sesion
   */
  logOut(): void {
    localStorage.removeItem('Authorization');
    this.router.navigateByUrl('/login');
    localStorage.removeItem('theme');
    localStorage.removeItem('darkMode');
    location.reload();
  }

  /**
   * Cambiar modo de la aplicacion (dark o light)
   */
  toggleTheme() {
    this.store.dispatch(toggleTheme());
  }




  // async getPerfil() {
  //   let response: any = await this.AccountService.getPerfil();
  //   this.funcionario = response;
  //   return response;
  // }

}