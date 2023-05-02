import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-page-unauthorized',
  templateUrl: './page-unauthorized.component.html',
  styleUrls: ['./page-unauthorized.component.scss']
})
export class PageUnauthorizedComponent implements OnInit {

  counter: number = 10;

  constructor(
    private readonly router: Router,
    private readonly mainService: MainService
  ) { }

  ngOnInit(): void {
    this.timer();
  }

  timer(){
    setTimeout(() => {
      this.counter--;
      if(this.counter == 0){
        this.mainService.logout();
      }
      else this.timer();
    }, 1000);
  }
}
