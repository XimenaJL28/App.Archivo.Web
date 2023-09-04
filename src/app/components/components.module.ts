import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../primeng.module';
import { NgOptimizedImage } from '@angular/common';


import { DragndropComponent } from './dragndrop/dragndrop.component';
import { DragndropDirective } from './dragndrop/dragndrop.directive';

import { OperacionViewComponent } from './operacion/operacion-view/operacion-view.component';
import { DocumentoFormComponent } from './documento/documento-form/documento-form.component';
import { FormsModule } from '@angular/forms';
import { EstudianteSearchComponent } from './estudiante/estudiante-search/estudiante-search.component';
import { EstudianteViewComponent } from './estudiante/estudiante-view/estudiante-view.component';
import { EstudianteInscripcionesComponent } from './estudiante/estudiante-inscripciones/estudiante-inscripciones.component';
import { EstudianteTramitesComponent } from './estudiante/estudiante-tramites/estudiante-tramites.component';
import { TramiteHeaderComponent } from './tramite/tramite-header/tramite-header.component';
import { TramitePresentadoComponent } from './tramite/tramite-presentado/tramite-presentado.component';
import { TramiteFaltanteComponent } from './tramite/tramite-faltante/tramite-faltante.component';
import { DocumentoPresentadoComponent } from './documento/documento-presentado/documento-presentado.component';
import { DocumentoOperacionesComponent } from './documento/documento-operaciones/documento-operaciones.component';
import { OperacionFormComponent } from './operacion/operacion-form/operacion-form.component';
import { DialogPlantillaComponent } from './tramites/dialog-plantilla/dialog-plantilla.component';
import { SharedModule } from '../shared/shared.module';
import { DocumentotipoFormComponent } from './tramites/documentotipo-form/documentotipo-form.component';

@NgModule({
  declarations: [
    DragndropComponent,
    DragndropDirective,
    OperacionViewComponent,
    DocumentoFormComponent,
    EstudianteSearchComponent,
    EstudianteViewComponent,
    EstudianteInscripcionesComponent,
    EstudianteTramitesComponent,
    TramiteHeaderComponent,
    TramitePresentadoComponent,
    TramiteFaltanteComponent,
    DocumentoPresentadoComponent,
    DocumentoOperacionesComponent,
    OperacionFormComponent,
    DialogPlantillaComponent,
    DocumentotipoFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgOptimizedImage,
    PrimengModule,
    SharedModule
  ],
  exports: [
    DragndropComponent,
    DragndropDirective,
    OperacionViewComponent,
    DocumentoFormComponent,
    EstudianteSearchComponent,
    EstudianteViewComponent,
    EstudianteInscripcionesComponent,
    EstudianteTramitesComponent,
    TramiteHeaderComponent,
    TramitePresentadoComponent,
    TramiteFaltanteComponent,
    DocumentoPresentadoComponent,
    DocumentoOperacionesComponent,
    OperacionFormComponent,
    DialogPlantillaComponent,
    DocumentotipoFormComponent
  ]
})
export class ComponentsModule { }
