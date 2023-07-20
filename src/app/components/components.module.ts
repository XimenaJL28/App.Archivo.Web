import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../primeng.module';

import { DragndropComponent } from './dragndrop/dragndrop.component';
import { DragndropDirective } from './dragndrop/dragndrop.directive';

import { OperacionViewComponent } from './operacion-view/operacion-view.component';
import { DocumentoFormComponent } from './documento-form/documento-form.component';
import { FormsModule } from '@angular/forms';
import { PlantillaFormComponent } from './plantilla-form/plantilla-form.component';

@NgModule({
  declarations: [
    DragndropComponent,
    DragndropDirective,
    OperacionViewComponent,
    DocumentoFormComponent,
    PlantillaFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimengModule
  ],
  exports: [
    DragndropComponent,
    DragndropDirective,
    OperacionViewComponent,
    DocumentoFormComponent,
    PlantillaFormComponent,
  ]
})
export class ComponentsModule { }
