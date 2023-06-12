import { Component, OnInit } from '@angular/core';
import { BuscarPersona } from 'src/app/interfaces';
import { Academico } from 'src/app/interfaces/estudiante/academico';
import { Estudiante } from 'src/app/interfaces/estudiante/estudiante';
import { Tramite } from 'src/app/interfaces/estudiante/tramite';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss']
})
export class EstudianteComponent implements OnInit {

  public estudiante?: Estudiante;
  public tramitesRealizados: Tramite[] = [];
  public tramitesAcademicos: Academico[] = [];

  public estudianteEncontradoList: BuscarPersona[] = [];
  public estudianteEncontradoItem: BuscarPersona | null = null;
  public estudianteEncontradoSuggestions: BuscarPersona[] = [];


  constructor(private estudianteService: EstudianteService, private mainService: MainService) { }

  getEstudiante(id: number): void {
    this.estudiante = this.estudianteService.getEstudiante(id);
    if (this.estudiante) {
      this.getTramitesAcademicos(this.estudiante.id);
      this.getTramitesRealizados(this.estudiante.id);
    }
  }

  getTramitesAcademicos(id: number): void {
    this.tramitesAcademicos = this.estudianteService.getTramitesAcademicos(id);
  }

  getTramitesRealizados(id: number): void {
    this.tramitesRealizados = this.estudianteService.getTramitesRealizados(id);
  }

  async buscarEstudiante(event: any) {
    // const url = `${environment.urlAccess}Basico/BuscarPersona?Parametro=${event.query}`
    // const estudianteList = await this.mainService.get<BuscarPersona[] | null | void>(url)
    const estudianteList: BuscarPersona[] = [{
      id: 2,
      nombreCompleto: "ximena",
      celular: "string",
      documentoIdentidad: "string",
      genero: "string",
      fechaNacimiento: "Date",
      nacionalidad: "string",
      foto: "string",
      sede: "string",
    },
    {
      id: 3,
      nombreCompleto: "juan",
      celular: "string",
      documentoIdentidad: "string",
      genero: "string",
      fechaNacimiento: "Date",
      nacionalidad: "string",
      foto: "string",
      sede: "string",
    },
    {
      id: 4,
      nombreCompleto: "fatima",
      celular: "string",
      documentoIdentidad: "string",
      genero: "string",
      fechaNacimiento: "Date",
      nacionalidad: "string",
      foto: "string",
      sede: "string",
    }]
    this.estudianteEncontradoSuggestions = estudianteList || [];
  }

  ngOnInit(): void {
  }
  buscarEstudianteSeleccionado(buscarPersona: BuscarPersona) {
    this.getEstudiante(buscarPersona.id);
  }

}
