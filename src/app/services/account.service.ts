import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { loadUser } from '../state/actions/user.actions';
import { UserState } from '../state/reducers/user.reducer';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  codeRemember!: number;
  constructor(
    private readonly mainService: MainService,
    private readonly store: Store<{user: UserState}>
  ) { }

  async sendCodeRememberPassForMail(userName: string, random: number) {
    let ans: any = await this.mainService.post(`${environment.endPointPortal}Funcionarios`);
    return ans;
  }

  async verificarCredencial(credenciales: any) {
    let ans: any = await this.mainService.post(`${environment.urlAccess}Accesos/VerificarCredencial`, credenciales);
    return ans;
  }

  async login(objLogin: any) {
    let ans: any = await this.mainService.post(`${environment.urlAccess}Accesos/Login`, objLogin);
    return ans;
  }

  async getBasicInfo() {
    let ans: any = await this.mainService.get(`${environment.endPointPortal}Personas/DatosBasico`);
    return ans;
  }


  async getProfile(): Promise<void> {
    let ans = await this.mainService.get<UserState>(`${environment.urlAccess}Accesos/Funcionario`);
    //? Updating user info in store
    this.store.dispatch(loadUser({data: (ans as UserState)}));
  }
}
