import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';

import { DocumentoTipo, DocumentoRespaldo } from '../../../interfaces/tramite.interface';
import { ListCarreraDTO } from '../../../interfaces/Plantilla.interface';

import { DocumentoTipoService } from '../../../services/documento-tipo.service';
import { PlantillaService } from '../../../services/plantilla.service';

@Component({
  selector: 'app-documentotipo-form',
  templateUrl: './documentotipo-form.component.html',
  styleUrls: ['./documentotipo-form.component.scss'],
  providers: [MessageService],
})
export class DocumentotipoFormComponent implements OnInit {
  @Output() cerrarDialogModal: EventEmitter<void> = new EventEmitter();

  //public documentoRespaldo?: ListCarreraDTO = undefined;
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
      nombre: '',
      estadoExpiracion: false,
      documentoRespaldoId: 0
    };

    this.documentoTipoService.getListDocumentoTipos()
      .then((response) => {
        this.documentoTipos = response || [];
        console.log('documentotipo', this.documentoTipos);


        /*let documentosRespaldos: DocumentoRespaldo[] = [
          {
            documentoRespaldoId: 0,
            nombre: ''
          }
        ];

        if (this.documentoTipos.length > 0) {
          this.documentoTipos.forEach(item => {
            if (item.documentoRespaldoId && item.documentoRespaldo) {
              documentosRespaldos.push({
                documentoRespaldoId: item.documentoRespaldoId,
                nombre: item.documentoRespaldo
              });
            }
          });

          this.documentoRespaldos = [...documentosRespaldos];
          if (this.documentoRespaldos.length > 0) {
            this.documentoTipo.documentoRespaldoId = this.documentoRespaldos[0].documentoRespaldoId;
          }
        }*/
      });

    this.documentoTipoService.getListDocumentoTipos()
      .then((carrerer: DocumentoTipo[]) => {
        this.documentoRespaldos = carrerer
      }).catch((error: any) => {
        console.log(error);
      });
  }

  seleccionarDocumentoTipo(documentoTipo: DocumentoTipo) {
    this.documentoTipo = { ...documentoTipo };
  }

  async actualizarDocumentoExpiracion() {
    if (!this.documentoTipo.documentoTipoId || this.documentoTipo.documentoTipoId < 1) {
      this.messageService.add({ severity: 'error', summary: 'Datos no validos', detail: 'Revisar valores del documento' });
      return;
    }

    const responseUpdate = await this.documentoTipoService.putEstadoExpiracionDocumentoTipo(
      { tipoid: this.documentoTipo.documentoTipoId || 0 }
    );

    console.log('documentotipo update', responseUpdate);

    if (responseUpdate) {
      this.messageService.add({ severity: 'error', summary: 'Verificar Datos', detail: 'Ha sucedido una excepción al modificar documento' });
      return;
    }

    this.cerrarDialogModal.emit();
  }

  async guardarDocumentoTipo() {
    if (this.documentoTipo.nombre.trim().length < 3 ||
      !this.documentoTipo.documentoRespaldoId) {
      this.messageService.add({ severity: 'error', summary: 'Datos no validos', detail: 'Revisar valores del documento' });
      return;
    }

    const documentoTipoId = this.documentoTipo.documentoTipoId || 0;
    // actualizar
    if (documentoTipoId > 0) {
      const responseUpdate = await this.documentoTipoService.putDocumentoTipo({
        tipoid: this.documentoTipo.documentoTipoId,
        respaldoid: this.documentoTipo.documentoRespaldoId,
      });
      console.log('documentotipo update', responseUpdate)
      if (responseUpdate) {
        this.messageService.add({ severity: 'error', summary: 'Verificar Datos', detail: 'Ha sucedido una excepción al modificar documento' });
        return;
      }

      this.cerrarDialogModal.emit();
    } else {
      // insertar
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
      this.cerrarDialogModal.emit();
    }
  }
}
