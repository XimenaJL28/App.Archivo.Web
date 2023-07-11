import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { MainService } from '../services/main.service';
import { ThemeState } from '../state/reducers/theme.reducer';
import { UserState } from '../state/reducers/user.reducer';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {



  //? State management
  themeState$: Observable<ThemeState>;




  @HostBinding('class') className = '';
  toggle = false;
  userName = "Ximena Justiniano";

  darkClassName = 'dark-theme';

  persona!: any;
  appReady = true;
  menus: any[] = [
    { ubicacion: 'home', titulo: 'Inicio', icono: 'pi-home', external: false },
    { ubicacion: 'operacion', titulo: 'Operaciones', icono: 'pi-calendar', external: false },
    { ubicacion: 'requerido', titulo: 'Doc. Requerido', icono: 'pi-dollar', external: false },
    { ubicacion: 'tramites', titulo: 'Trámites', icono: 'pi-home', external: false },
    // { ubicacion: 'register', titulo: 'Register', icono: 'pi-book', external: false },
    // { ubicacion: 'https://portal.upds.edu.bo/ev-docente/#/loginms', titulo: 'Teacher Eval.', icono: 'pi-sliders-h', external: true },
  ];

  items: any[] = [
    { label: '', icon: 'pi pi-fw pi-home', path: 'home' },
    { label: '', icon: 'pi pi-calendar-plus', path: 'history' },
    { label: '', icon: 'pi pi-discord', path: 'screen2' },
    { label: '', icon: 'pi pi-fw pi-dollar', path: 'pay' },
    { label: '', icon: 'pi pi-fw pi-book', path: 'register' },
  ];

  itemSelected: any = {};

  constructor(
    private readonly mainService: MainService,
    private readonly accountService: AccountService,
    private readonly router: Router,
    private readonly store: Store<{ theme: ThemeState }>) {

    this.themeState$ = this.store.select("theme");


    this.appReady = true;


  }

  ngOnInit(): void {

    //? Load user data when user is logged
    this.accountService.getProfile();


  }

  async tienePermisos() {
    // let response = await this.mainS.getModulos();
  }
  async obtenerInterfaces() {
    // let response = await this.mainS.getInterfaces();
    // this.mainS.interfaces = response;
    // this.menus = response;
  }

  changeToggle() {
    this.toggle = !this.toggle;
  }

  redirectForTab(item: any) {
    console.log(item, this.itemSelected);

    this.router.navigateByUrl(item.path);
  }

}