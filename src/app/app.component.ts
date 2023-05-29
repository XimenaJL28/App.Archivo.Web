import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from './state/reducers/user.reducer';
import { ThemeState } from './state/reducers/theme.reducer';
import { loadTheme } from './state/actions/theme.actions';

//Soy giancarlo

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
    // this.store.dispatch(loadUser({data: {UserState}}))
  }
}
