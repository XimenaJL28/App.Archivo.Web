import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { LoginDTO } from '../models/login-dto';
import { VerificarCredencialesDTO } from '../models/verificar-credenciales-dto';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {

  urlLogin = environment.urlLogin;
  urlLoginStudent = environment.urlLogin;
  cargandoData = false;
  encoded: string = '';
  token = '';
  user = {
    userName: "",
    password: "",
    appId: 0
  }
  remember = false;

  objLogin = {
    id: 0,
    sedeId: 1,
    appId: 1,
    tipo: ''
  }

  sedes: any = {
    options: ['Funcionario', 'Estudiante'],
    sedesFuncionario: [],
    sedesEstudiante: [],
    roll: '',
    dataCargada: false
  };

  //? My variables
  showPassword: boolean = false;

  toggleShowPassword(){ this.showPassword = !this.showPassword}
  //? -------------------

  constructor(
    public readonly router: Router, 
    private readonly accountService: AccountService, 
    private readonly messageService: MessageService
    ) {
    this.token = this.router.parseUrl(this.router.url).queryParams['token'];
    if (this.token != '' && this.token != null) {
      localStorage.setItem('Authorization', this.token);
      router.navigateByUrl('/');
    }

    //? Redirect to home page whe user is already logged in
    if(localStorage.getItem("Authorization")) this.router.navigateByUrl("/home");

  }

  /**
   * Recupera las credenciales del usuario 
   */
  ngOnInit(): void {
    if (localStorage.getItem('credenciales') != null && localStorage.getItem('credenciales') != '') {
      let user: any = (localStorage.getItem('credenciales') ?? '');
      var actual = JSON.parse(window.atob(user))
      this.user.userName = actual.userName;
      this.user.password = actual.password ?? '';
      this.remember = true;
    }
  }

  /**
   * Verifica las credenciales del usuario
   * @param form
   */
  verificarCredencial() {
    this.encoded = window.btoa(JSON.stringify(this.user))
    if (this.remember) {
      localStorage.setItem('credenciales', this.encoded);
    } else {
      localStorage.removeItem('credenciales');
    }
    this.cargandoData = true;
    this.user.userName = this.user.userName.trim();
    this.accountService.verificarCredencial(this.user).then((res: VerificarCredencialesDTO) => {
      this.sedes.sedesFuncionario = res.sedesFuncionario;
      this.sedes.sedesEstudiante = res.sedesEstudiante;
      this.sedes.dataCargada = true;
      this.sedes.roll = this.roll();
      localStorage.setItem('Authorization', res.userToken.token);
      if (this.sedes.sedesEstudiante.length == 1) {
        let objEvent = { value: this.sedes.sedesEstudiante[0] }
        this.selectSede(objEvent);
      }
    }).catch((err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Alert!', detail: err.error });
      console.log(err);
    }).finally(() => {
      // this.router.navigateByUrl('/');
      this.cargandoData = false;
    });
  }


  roll() {
    if (this.sedes.sedesFuncionario.length > 0 && this.sedes.sedesEstudiante.length == 0) {
      return "Funcionario";
    }
    if (this.sedes.sedesFuncionario.length == 0 && this.sedes.sedesEstudiante.length > 0) {
      return "Estudiante";
    }
    return "";
  }

  /**
   * Selecciona la sede del usuario
  */
  selectSede(sede: any) {
    this.cargandoData = true;
    this.objLogin.sedeId = sede.value.id;
    this.objLogin.tipo = this.sedes.roll;
    this.accountService.login(this.objLogin).then((res: LoginDTO) => {
      localStorage.setItem('Authorization', res.token);
      this.router.navigateByUrl('/');
    }).catch((err: any) => {
      console.log(err);
    }).finally(() => {
      this.cargandoData = false;
    });
  }


  login(admin: boolean) {
    if (admin) {
      localStorage.setItem('Role', 'admin');
      window.location.href = this.urlLogin;
    } else {
      localStorage.setItem('Role', 'student');
      window.location.href = this.urlLoginStudent;

    }
  }

}
