import { Component, OnInit } from '@angular/core';
import { BuscarPersona } from 'src/app/interfaces';
import { Academico } from 'src/app/interfaces/estudiante/academico';
import { Estudiante } from 'src/app/interfaces/estudiante/estudiante';
import { Tramite } from 'src/app/interfaces/estudiante/tramite';
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
  // public tramitesRealizados: Tramite[] = [];
  // public tramitesAcademicos: Academico[] = [];
  public estudianteList: BuscarPersona[] = [];
  public inscripciones: InscripcionEstudiante[] = [];
  public tramites: TramiteInscripcion[] = [];

  public estudianteEncontradoList: BuscarPersona[] = [];
  public estudianteEncontradoItem: BuscarPersona | null = null;
  public estudianteEncontradoSuggestions: BuscarPersona[] = [];
  datospersona: Partial<BuscarPersona> = {};

  //?variables aux
  datacargada: boolean = false;
  Idinscripcion: any;
  idinscripcionsede: any;
  tramitesstate: boolean = false;

  constructor(private estudianteService: EstudianteService,
    private mainService: MainService,
    private readonly TramiteService: TramiteService) { }

  ngOnInit(): void {
  }


  buscarEstudianteSeleccionado(buscarPersona: any) {
    this.datospersona = buscarPersona;
    this.datacargada = true;
    this.Idinscripcion = this.datospersona.id;
    this.getinscripcions(this.Idinscripcion)

  }

  async busqueda(event: any) {
    this.buscarEstudiante(event).then((response) => {
      this.estudianteList = response;
      // this.datospersona = this.estudianteList[0];
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      this.estudianteEncontradoSuggestions = this.estudianteList || [];
      this.tramitesstate = false;
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
    this.tramites = response;
    this.tramitesstate = true
    console.log(this.tramites);
    return response;
  }

}
