import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ThemeState } from 'src/app/state/reducers/theme.reducer';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {


  themeState$: Observable<ThemeState>;
  counter: number = 5;

  constructor(
    private readonly router: Router,
    private readonly store: Store<{theme: ThemeState}>
  ) { 
    this.themeState$ = this.store.select("theme");
  }

  ngOnInit(): void {
    this.timer();
  }

  timer(){
    setTimeout(() => {
      this.counter--;
      if(this.counter == 0){
        this.router.navigateByUrl("/home");
      }
      else this.timer();
    }, 1000);
  }

}
