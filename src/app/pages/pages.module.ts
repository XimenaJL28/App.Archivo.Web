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
import { EstudianteComponent } from './estudiante/estudiante.component';
import { ArchivoComponent } from './archivo/archivo.component';
import { DocumentoComponent } from './documento/documento.component';
import { OperacionComponent } from './operacion/operacion.component';
import { ReprogramacionComponent } from './reprogramacion/reprogramacion.component';
import { RequeridoComponent } from './requerido/requerido.component';
import { TramiteInscripcionStepsComponent } from './tramite-inscripcion-steps/tramite-inscripcion-steps.component';
import { DocumentoOperacionComponent } from './documento-operacion/documento-operacion.component';
import { DocumentoInscripcionComponent } from './documento-inscripcion/documento-inscripcion.component';
import { TramiteInscripcionComponent } from './tramite-inscripcion/tramite-inscripcion.component';


//? Routes
const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'estudiante', component: EstudianteComponent },
      { path: 'operacion', component: OperacionComponent },
      { path: 'requerido', component: RequeridoComponent },
      {
        path: 'tramite',
        component : TramiteInscripcionStepsComponent,
        children:[
          { path: '', redirectTo: 'inscripcion', pathMatch: 'full' },
          { path: 'inscripcion', component: TramiteInscripcionComponent },
          { path: 'documento', component: DocumentoInscripcionComponent },
          { path: 'operacion', component: DocumentoOperacionComponent },
        ],
      },
      { path: 'tramite/:tramiteId/estudiante/:estudianteId/archivo', component: ArchivoComponent },
      { path: 'tramite/:tramiteId/estudiante/:estudianteId/documento', component: DocumentoComponent },
      { path: 'tramite/:tramiteId/estudiante/:estudianteId/reprogramacion', component: ReprogramacionComponent },
  
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
    EstudianteComponent,
    ArchivoComponent,
    DocumentoComponent,
    OperacionComponent,
    ReprogramacionComponent,
    RequeridoComponent,
    TramiteInscripcionComponent,
    TramiteInscripcionStepsComponent,
    DocumentoOperacionComponent,
    DocumentoInscripcionComponent
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
