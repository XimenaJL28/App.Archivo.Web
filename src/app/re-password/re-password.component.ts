import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { MainService } from '../services/main.service';

@Component({
  templateUrl: './re-password.component.html',
  styleUrls: ['./re-password.component.scss']
})
export class RePasswordComponent implements OnInit {

  username = '';
  random!: number;

  sendingCode = false;
  codeIsGenerated = false;
  randomReceived!: number;

  success!: boolean;
  accessCode = 'Regla2009';

  constructor(private accountS: AccountService, private mainS: MainService, private router: Router) { }

  ngOnInit(): void {
  }

  generateRandomNumber() {
    this.sendingCode = true;
    this.random = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    console.log(this.random);
    this.accountS.codeRemember = this.random;

    this.accountS.sendCodeRememberPassForMail(this.username, this.random).then((response: any) => {
      console.log(response);
    }).catch((error: any) => {
      this.codeIsGenerated = true;
      console.log(error);
    }).finally(() => this.sendingCode = false);
  }

  compareCode() {
    if (this.accountS.codeRemember == this.randomReceived) {
      console.log('ok');
      this.success = true;
    } else 
    this.success = false;
  }

  goToLogin(){
    let credenciales = {
      username: this.username,
      password: this.accessCode
    };
    localStorage.setItem('credenciales', JSON.stringify(credenciales));
    this.router.navigateByUrl('/login');
  }

}
