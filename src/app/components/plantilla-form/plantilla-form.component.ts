import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as tramiteActions from '../../state/actions/tramite.actions';
import { TramiteState } from '../../state/reducers/tramite.reducers';

import { TramiteService } from '../../services/tramite.service';

@Component({
  selector: 'app-plantilla-form',
  templateUrl: './plantilla-form.component.html',
  styleUrls: ['./plantilla-form.component.scss'],
  providers: [MessageService],
})
export class PlantillaFormComponent implements OnInit, OnDestroy {
  @Input() isUpdate: boolean = false;
  public savedLoading: boolean = false;
  public tramiteSubTipo: any;

  public cantidadMinima: number = 0;
  public plazoMaximo: string = '';
  public obligatorio: string = '';

  public documentoTipos: any[] = [];
  public documentoTipoSelected: any = undefined;

  public documentoPlanillaEstados: any[] = [];
  public documentoPlanillaEstadoSelected: any = undefined;

  public carreras: any[] = [];
  public carreraSelected: any = undefined;

  private tramiteSubscriptions!: Subscription;

  constructor(
    private store: Store<{ tramite: TramiteState }>,
    private tramiteService: TramiteService,
    private messageService: MessageService) {

    this.tramiteService.getDropDownDocumentoTipo().then((response: any) => {
      this.documentoTipos = response || [];
    })

    this.tramiteService.getDropDownDocumentoPlantillaEstado().then((response: any) => {
      this.documentoPlanillaEstados = response || [];
    })

    this.tramiteService.getDropDownCarrera().then((response: any) => {
      this.carreras = response || [];
    })
  }


  ngOnInit(): void {
    this.tramiteSubscriptions = this.store.select('tramite').subscribe(state => {
      this.tramiteSubTipo = state.documento;

      if (this.isUpdate && this.tramiteSubTipo) {
      }
    })
  }

  ngOnDestroy(): void {
    this.tramiteSubscriptions.unsubscribe();
  }

  async guardarPlantilla() {

  }
}
