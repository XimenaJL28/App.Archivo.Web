import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from './state/reducers/user.reducer';
import { ThemeState } from './state/reducers/theme.reducer';
import { loadTheme } from './state/actions/theme.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LineaGraficaUPDS-Angular-PrimeNG';
  constructor(
    private readonly store: Store<{ theme: ThemeState, user: UserState }>
  ) {
    this.store.dispatch(loadTheme())
    // this.traer();
  }

  traer() {
    let login = environment.urlLogin;
    let access = environment.urlAccess;
    let file = environment.urlFile;
    let api = environment.endPoint;
    console.log('login', login);
    console.log('access', access);
    console.log('file', file);
    console.log('api', api);
  }
}
