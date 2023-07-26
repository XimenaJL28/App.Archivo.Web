import { TestBed } from '@angular/core/testing';

import { EstudianteService } from './estudiante.service';
import { MainService } from './main.service';
import { mockPersonaList } from '../models/estudiante.mock';

describe('EstudianteService', () => {
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
      const criterio = '2813';

      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve(mock));

      const response = await estudianteService.buscarEstudiante(criterio);

      expect(response?.length).toEqual(mock.length);
      expect(mainServiceSpy.get).toHaveBeenCalled();
      expect(mainServiceSpy.get).toHaveBeenCalledTimes(1);
    });

    it('should be buscarEstudiantes error',async()=>{
      const criterio = '2813';
      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.reject(undefined));

      try {
        await estudianteService.buscarEstudiante(criterio);
      } catch (error) {
        expect(error).toBeUndefined();
      }
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });

    it('should be buscarEstudiantes criterio empty',async()=>{
      const criterio = '';
      const response = await estudianteService.buscarEstudiante(criterio);
      expect(response).toBeUndefined();
      expect(mainServiceSpy.get).toHaveBeenCalledTimes(0);
    });
  })
});

