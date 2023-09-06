import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';

import { DocumentoTipo } from '../../../interfaces/tramite.interface';
import { ListCarreraDTO } from '../../../interfaces/Plantilla.interface';

import { DocumentoTipoService } from '../../../services/documento-tipo.service';
import { PlantillaService } from '../../../services/plantilla.service';
import { InputSwitchOnChangeEvent } from 'primeng/inputswitch';

@Component({
  selector: 'app-documentotipo-form',
  templateUrl: './documentotipo-form.component.html',
  styleUrls: ['./documentotipo-form.component.scss'],
  providers: [MessageService],
})
export class DocumentotipoFormComponent implements OnInit {
  @Output() cerrarDialogModal: EventEmitter<void> = new EventEmitter();

  public documentoRespaldos: DocumentoTipo[] = [];
  public documentoTipos: DocumentoTipo[] = [];
  public documentoTipo!: DocumentoTipo;

  constructor(
    private readonly documentoTipoService: DocumentoTipoService,
    private readonly plantillaService: PlantillaService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.documentoTipo = {
      documentoTipoId: 0,
      nombre: '',
      estadoExpiracion: false,
      documentoRespaldoId: -1
    };

    this.documentoTipoService.getListDocumentoTipos()
      .then((response) => {
        this.documentoTipos = response || [];
        // this.documentoTipos = [
        //   {
        //     documentoTipoId: 1,
        //     nombre: 'asdwrr',
        //     estadoExpiracion: false,
        //     documentoRespaldoId: -1
        //   },
        //   {
        //     documentoTipoId: 3,
        //     nombre: 'asdfsad',
        //     estadoExpiracion: true,
        //     documentoRespaldoId: -1
        //   }
        // ];
      });

    this.documentoTipoService.getListDocumentoTipos()
      .then((carrerer: DocumentoTipo[]) => {
        this.documentoRespaldos = carrerer || [];

        if (this.documentoRespaldos.length > 0) {
          this.documentoTipo.documentoRespaldoId = this.documentoRespaldos[0].documentoTipoId || -1;
        }
      }).catch((error: any) => {
        console.log(error);
      });
  }

  async actualizarDocumentoExpiracion(evt: InputSwitchOnChangeEvent, documentoTipo: DocumentoTipo) {
    if (!evt.checked) return;

    const documentoTipoId = documentoTipo.documentoTipoId || 0;

    if (documentoTipoId < 1) {
      this.messageService.add({ severity: 'error', summary: 'Datos no validos', detail: 'Revisar valores del documento' });
      return;
    }

    try {
      const responseUpdate = await this.documentoTipoService.putEstadoExpiracionDocumentoTipo(
        { tipoid: documentoTipoId }
      );
      console.log('documentotipo update', responseUpdate);
      if (responseUpdate) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se ha registrado los documentos a la plantilla' });
      }
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Verificar Datos', detail: 'Ha sucedido una excepción al modificar documento' });
      return;
    }
    //this.cerrarDialogModal.emit();
  }

  async guardarDocumentoTipo() {
    // if (this.documentoTipo.nombre.trim().length < 3 ||
    //   !this.documentoTipo.documentoRespaldoId ||
    //   this.documentoTipo.documentoRespaldoId < 0
    // ) {
    //   this.messageService.add({ severity: 'error', summary: 'Datos no validos', detail: 'Revisar valores del documento' });
    //   return;
    // }

    const data: DocumentoTipo = {
      nombre: this.documentoTipo.nombre,
      estadoExpiracion: this.documentoTipo.estadoExpiracion,
      documentoRespaldoId: this.documentoTipo.documentoRespaldoId,
    }

    const responseInsert = await this.documentoTipoService.postDocumentoTipo(data);
    console.log('documentotipo save', responseInsert)
    if (!responseInsert) {
      this.messageService.add({ severity: 'error', summary: 'Verificar Datos', detail: 'Ha sucedido una excepción al modificar documento' });
      return;
    }

    this.documentoTipoService.getListDocumentoTipos()
      .then((response) => {
        this.documentoTipos = response || [];
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se ha registrado los documentos a la plantilla' });
      });
  }

  async actualizarDocumentoTipo(documentoTipo: DocumentoTipo) {
    if (!documentoTipo.documentoRespaldoId || documentoTipo.documentoRespaldoId < 0) {
      this.messageService.add({ severity: 'error', summary: 'Datos no validos', detail: 'Revisar valores del documento' });
      return;
    }

    try {
      const responseUpdate = await this.documentoTipoService.putDocumentoTipo({
        tipoid: documentoTipo.documentoTipoId,
        respaldoid: documentoTipo.documentoRespaldoId,
      });
      console.log('documentotipo update', responseUpdate);

      if (responseUpdate) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se ha registrado los documentos a la plantilla' });
      }
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Verificar Datos', detail: 'Ha sucedido una excepción al modificar documento' });
    }
  }

  nuevoElemento() {
    const documentoRespaldoId = this.documentoRespaldos.length > 0 ? this.documentoRespaldos[0].documentoTipoId : -1;

    this.documentoTipo = {
      documentoTipoId: 0,
      nombre: '',
      estadoExpiracion: false,
      documentoRespaldoId: documentoRespaldoId
    };
  }
}
