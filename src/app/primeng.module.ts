import { NgModule } from '@angular/core';

//? Components
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SkeletonModule } from 'primeng/skeleton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { ImageModule } from 'primeng/image';
import { StepsModule } from 'primeng/steps';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
  exports: [
    AccordionModule,
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CheckboxModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    DynamicDialogModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    ListboxModule,
    MenuModule,
    MessageModule,
    MessagesModule,
    PanelMenuModule,
    PanelModule,
    PasswordModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    SelectButtonModule,
    SkeletonModule,
    SplitButtonModule,
    TableModule,
    TabMenuModule,
    ToastModule,
    TagModule,
    ImageModule,
    StepsModule,
    InputSwitchModule,
  ]
})
export class PrimengModule { }
