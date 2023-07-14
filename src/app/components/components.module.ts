import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../primeng.module';

import { DragndropComponent } from './dragndrop/dragndrop.component';
import { DragndropDirective } from './dragndrop/dragndrop.directive';

import { OperacionViewComponent } from './operacion-view/operacion-view.component';
import { DocumentoFormComponent } from './documento-form/documento-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DragndropComponent,
    DragndropDirective,
    OperacionViewComponent,
    DocumentoFormComponent
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
  ]
})
export class ComponentsModule { }
