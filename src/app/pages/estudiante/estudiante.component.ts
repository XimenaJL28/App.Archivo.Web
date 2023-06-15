import { Component, OnInit } from '@angular/core';
import { BuscarPersona } from 'src/app/interfaces';
import { Estudiante } from 'src/app/interfaces/estudiante/estudiante';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { MainService } from 'src/app/services/main.service';
import { TramiteService } from '../../services/tramite.service';
import { InscripcionEstudiante, TramiteInscripcion } from 'src/app/interfaces/persona.interface';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss']
})
export class EstudianteComponent implements OnInit {

  public estudiante?: Estudiante;
  public estudianteList: BuscarPersona[] = [];
  public inscripciones: InscripcionEstudiante[] = [];
  public tramites: TramiteInscripcion[] = [];

  public estudianteEncontradoList: BuscarPersona[] = [];
  public estudianteEncontradoItem: BuscarPersona | null = null;
  public estudianteEncontradoSuggestions: BuscarPersona[] = [];
  public tramitesAgrupados: any[] = [];
  datospersona: Partial<BuscarPersona> = {};

  //?variables aux
  datacargada: boolean = false;
  Idinscripcion: any;
  idinscripcionsede: any;
  tramitesstate: boolean = false;

  constructor(private estudianteService: EstudianteService,
    private mainService: MainService,
    private readonly TramiteService: TramiteService) {
  }

  ngOnInit(): void {

  }

  buscarEstudianteSeleccionado(buscarPersona: any) {
    this.datospersona = buscarPersona;
    this.datacargada = true;
    this.Idinscripcion = this.datospersona.id;
    this.getinscripcions(this.Idinscripcion)
    this.tramitesstate = false;
    this.datospersona.foto == "" ? this.datospersona.foto = 'https://portal.upds.edu.bo/index/images/usuario.jpg' : this.datospersona.foto = this.datospersona.foto;

  }

  async busqueda(event: any) {
    this.buscarEstudiante(event).then((response) => {
      this.estudianteList = response;
      // this.datospersona = this.estudianteList[0];
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      this.estudianteEncontradoSuggestions = this.estudianteList || [];
      this.tramites = [];
      this.tramitesAgrupados = [];
    });
  }

  async buscarEstudiante(name: any) {
    let response: any = await this.estudianteService.Searchperson(name);
    return response;

  }

  async getinscripcions(idperson: any) {
    let response: any = await this.TramiteService.GetInscripcions(idperson);
    this.inscripciones = response;
    return response;
  }

  async gettramites(idinscripcion: number) {
    let response: any = await this.TramiteService.GetListTramites(idinscripcion);
    this.tramites = response || [];
    this.tramitesstate = this.tramites.length == 0;
    // this.tramitesAgrupados = this.tramites;
    this.tramitesAgrupados = this.agruparTramites(this.tramites);
    return response;
  }

  sortDataArray(tramiteList: any): any[] {
    return tramiteList.sort((a: any, b: any) => {
      if (a.tramite < b.tramite) { return -1; }
      if (a.tramite > b.tramite) { return 1; }
      return 0;
    });
  }

  agruparTramites(tramitesListData: any[]) {
    const tramitesList = this.sortDataArray(tramitesListData);

    let tramitesGroup: any[] = [];
    let index = 0;

    while (index < tramitesList.length) {
      let tramites: any[] = [];
      let cantidadDeTramites = 0;
      const nombreTramite = tramitesList[index].tramite;

      while (index < tramitesList.length && nombreTramite === tramitesList[index].tramite) {
        console.log('index: ' + nombreTramite, ' array: ' + tramitesList[index].tramite);
        tramites.push(tramitesList[index]);
        cantidadDeTramites++;
        index++;
      }
      if (cantidadDeTramites > 0) {
        const item = {
          nombreTramite,
          cantidadDeTramites,
          tramites
        };
        tramitesGroup.push(item);
      }
    }
    return tramitesGroup;
  }
}
