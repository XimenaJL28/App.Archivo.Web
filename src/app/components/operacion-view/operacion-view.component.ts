import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserState } from 'src/app/state/reducers/user.reducer';

@Component({
  selector: 'app-operacion-view',
  templateUrl: './operacion-view.component.html',
  styleUrls: ['./operacion-view.component.scss']
})
export class OperacionViewComponent implements OnInit {
  @Input() documento: any;
  @Input() operacion: any;
  userState$: Observable<UserState>;

  fecha: any;
  funcionario: any = {};

  constructor(private readonly store: Store<{ user: UserState }>) {
    this.userState$ = this.store.select("user");
    this.userState$.subscribe(user => this.funcionario = user);
    this.fecha = new Date();
   }

  ngOnInit(): void {
  }

}
