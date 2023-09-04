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
import { EstudiantePageComponent } from './estudiante-page/estudiante-page.component';
import { TramiteInscripcionStepsComponent } from './tramite-inscripcion-steps/tramite-inscripcion-steps.component';
import { TramitesPageComponent } from './tramites-page/tramites-page.component';
import { TramitePageComponent } from './tramite-page/tramite-page.component';
import { DocumentoPageComponent } from './documento-page/documento-page.component';
import { OperacionPageComponent } from './operacion-page/operacion-page.component';
import { PermisoGuard } from '../guards/permiso.guard';

//? Routes
const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'estudiante', component: EstudiantePageComponent },
      { path: 'tramites', component: TramitesPageComponent },
      {
        path: 'tramite',
        component: TramiteInscripcionStepsComponent,
        //canActivate: [PermisoGuard],
        //canActivateChild: [PermisoGuard],
        children: [
          { path: '', redirectTo: 'inscripcion', pathMatch: 'full' },
          { path: 'inscripcion', component: TramitePageComponent },
          { path: 'documento', component: DocumentoPageComponent },
        ],
      },
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
    EstudiantePageComponent,
    TramitesPageComponent,
    TramitePageComponent,
    TramiteInscripcionStepsComponent,
    DocumentoPageComponent,
    OperacionPageComponent,
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
