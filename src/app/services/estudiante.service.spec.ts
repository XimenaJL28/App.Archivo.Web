import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { environment } from '../../environments/environment';

import { EstudianteService } from './estudiante.service';
import { MainService } from './main.service';
import { mockPersonaList } from '../models/estudiante.mock';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';

fdescribe('EstudianteService', () => {
  let estudianteService: EstudianteService;
  // dependecia de servicio, creando un Spy (espia)
  let mainServiceSpy: jasmine.SpyObj<MainService>;

  beforeEach(() => {
    // Creacion del Spy y habilitacion de las funciones a utilizar
    const spy = jasmine.createSpyObj('MainService', ['get', 'post', 'put'])
    // Configuracion del servicio para la inyeccion de dependencias
    TestBed.configureTestingModule({
      providers: [
        EstudianteService,
        // Configuracion del Spy
        { provide: MainService, useValue: spy }
      ],
    });
    // Inyeccion del servicio
    estudianteService = TestBed.inject(EstudianteService);
    // Inyeccion del servicio Spy
    mainServiceSpy = TestBed.inject(MainService) as jasmine.SpyObj<MainService>;
  });

  it('should be created', () => {
    expect(estudianteService).toBeTruthy();
  });

  describe('should be buscarEstudiantes', () => {
    it('should be buscarEstudiantes ok', async () => {
      const mock = mockPersonaList();
      // Arrange
      const criterio = '2813';

      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve(mock));
      // Action
      const response = await estudianteService.buscarEstudiante(criterio);
      //Assert
      expect(response?.length).toEqual(mock.length);
      expect(response?.[0]).toEqual(mock[0]);
      expect(mainServiceSpy.get).toHaveBeenCalled();
      expect(mainServiceSpy.get).toHaveBeenCalledTimes(1);
    });

    it('should be buscarEstudiantes error', async () => {
      //Arrange
      const criterio = '2813';
      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.reject(undefined));
      // Action
      try {
        await estudianteService.buscarEstudiante(criterio);
      } catch (error) {
        //Assert
        expect(error).toBeUndefined();
      }
      //Assert
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });
  })
});

