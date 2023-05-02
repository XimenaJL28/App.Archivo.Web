//? Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//? Custom Modules
import { PrimengModule } from '../primeng.module';
import { SharedModule } from '../shared/shared.module';

//? Components
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PagesComponent } from './pages.component';
import { PageUnauthorizedComponent } from './page-unauthorized/page-unauthorized.component';
import { ComponentsModule } from '../components/components.module';


//? Routes
const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      //! Error Pages
    ]
  }
]


@NgModule({
  declarations: [
    HomeComponent,
    PageNotFoundComponent,
    PagesComponent,
    PageUnauthorizedComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PrimengModule,
    ReactiveFormsModule,
    SharedModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ]
})
export class PagesModule { }
