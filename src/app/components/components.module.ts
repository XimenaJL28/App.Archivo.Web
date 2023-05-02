import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../primeng.module';



import { DragndropComponent } from './dragndrop/dragndrop.component';
import { DragndropDirective } from './dragndrop/dragndrop.directive';


@NgModule({
  declarations: [
    DragndropComponent,
    DragndropDirective
  ],
  imports: [
    CommonModule,
    PrimengModule
  ],
  exports: [
    DragndropComponent,
    DragndropDirective
  ]
})
export class ComponentsModule { }
