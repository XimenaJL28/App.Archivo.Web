import { TestBed } from '@angular/core/testing';

import { MainService } from './main.service';
import { TramiteService } from './tramite.service';

import { DocumentoOperacion } from '../interfaces/tramite.interface';
import { Inscripcion, TramiteInscripcionCarrera, DocumentoInscripcionCarrera } from '../interfaces/estudiante.interface';

import { mockDataDocumentoSave, mockDataDocumentoUpdate, mockDataOperacionResponse, mockDataOperacionSave, mockDocumentoFaltanteList, mockDocumentoList, mockDropDownList, mockInscripcionList, mockOperacionList, mockTramiteInscripcionList, mockTramiteList } from '../models/tramite.mock';

describe('TramiteService', () => {
  let tramiteService: TramiteService;
  let mainServiceSpy: jasmine.SpyObj<MainService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MainService', ['get', 'post', 'put'])
    TestBed.configureTestingModule({
      providers: [
        TramiteService,
        { provide: MainService, useValue: spy }
      ],
    });
    tramiteService = TestBed.inject(TramiteService);
    mainServiceSpy = TestBed.inject(MainService) as jasmine.SpyObj<MainService>;
  });

  it('should be created', () => {
    expect(tramiteService).toBeTruthy();
  });

  describe('should be getInscripciones', () => {
    it('should be getInscripciones request ok', async () => {
      const mock = mockInscripcionList();
      const personaId = 2813;

      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve(mock));

      const response = await tramiteService.getInscripciones(personaId);

      expect(response?.length).toEqual(mock.length);
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });

    it('should be getInscripciones request error', async () => {
      const personaId = 2813;
      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.reject(undefined));

      try {
        await tramiteService.getInscripciones(personaId);
      } catch (error) {
        expect(error).toBeUndefined();
      }
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });

    it('should be getInscripciones request find empty', async () => {
      const mock: Inscripcion[] = [];
      const personaId = 2813;

      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve(mock));

      const response = await tramiteService.getInscripciones(personaId);

      expect(response?.length).toEqual(mock.length);
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });
  })

  describe('should be getListTramites', () => {
    it('should be getListTramites request ok', async () => {
      const mock = mockTramiteInscripcionList();
      const inscripcionId = 2813;

      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve(mock));

      const response = await tramiteService.getListTramites(inscripcionId);

      expect(response?.length).toEqual(mock.length);
      expect(response?.[0]).toEqual(mock[0]);
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });

    it('should be getListTramites request error', async () => {
      const inscripcionId = 2813;
      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.reject(undefined));

      try {
        await tramiteService.getListTramites(inscripcionId);
      } catch (error) {
        expect(error).toBeUndefined();
      }
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });

    it('should be getListTramites request find empty', async () => {
      const mock: TramiteInscripcionCarrera[] = [];
      const inscripcionId = 2813;

      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve(mock));

      const response = await tramiteService.getListTramites(inscripcionId);

      expect(response?.length).toEqual(mock.length);
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });
  })

  describe('should be getListDocumentos', () => {
    it('should be getListDocumentos request ok', async () => {
      const mock = mockDocumentoList();
      const tramiteInscripcionCarreraId = 2813;
      const tramiteSubTipoId = 2813;

      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve(mock));

      const response = await tramiteService.getListDocumentos(tramiteInscripcionCarreraId, tramiteSubTipoId);

      expect(response?.length).toEqual(mock.length);
      expect(response?.[0]).toEqual(mock[0]);
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });

    it('should be getListDocumentos request error', async () => {
      const tramiteInscripcionCarreraId = 2813;
      const tramiteSubTipoId = 2813;
      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.reject(undefined));

      try {
        await tramiteService.getListDocumentos(tramiteInscripcionCarreraId, tramiteSubTipoId);
      } catch (error) {
        expect(error).toBeUndefined();
      }
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });

    it('should be getListDocumentos request find empty', async () => {
      const mock: DocumentoInscripcionCarrera[] = [];
      const tramiteInscripcionCarreraId = 2813;
      const tramiteSubTipoId = 2813;

      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve(mock));

      const response = await tramiteService.getListDocumentos(tramiteInscripcionCarreraId, tramiteSubTipoId);

      expect(response?.length).toEqual(mock.length);
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });
  })

  describe('should be getListDocumentoFaltante', () => {
    it('should be getListDocumentoFaltante request ok', async () => {
      const mock = mockDocumentoFaltanteList();
      const tramiteInscripcionCarreraId = 2813;
      const tramiteSubTipoId = 2813;

      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve(mock));

      const response = await tramiteService.getListDocumentoFaltante(tramiteInscripcionCarreraId, tramiteSubTipoId);

      expect(response?.length).toEqual(mock.length);
      expect(response?.[0]).toEqual(mock[0]);
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });

    it('should be getListDocumentoFaltante request error', async () => {
      const tramiteInscripcionCarreraId = 2813;
      const tramiteSubTipoId = 2813;
      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.reject(undefined));

      try {
        await tramiteService.getListDocumentoFaltante(tramiteInscripcionCarreraId, tramiteSubTipoId);
      } catch (error) {
        expect(error).toBeUndefined();
      }
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });

    it('should be getListDocumentoFaltante request find empty', async () => {
      const mock: DocumentoInscripcionCarrera[] = [];
      const tramiteInscripcionCarreraId = 2813;
      const tramiteSubTipoId = 2813;

      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve(mock));

      const response = await tramiteService.getListDocumentoFaltante(tramiteInscripcionCarreraId, tramiteSubTipoId);

      expect(response?.length).toEqual(mock.length);
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });
  })

  describe('should be postDocumentoInscripcionCarrera', () => {
    it('should be postDocumentoInscripcionCarrera request ok', async () => {
      const mock = mockDataDocumentoSave();
      mainServiceSpy.post.withArgs(jasmine.any(String), jasmine.any(Object)).and.returnValue(Promise.resolve(mock));

      const response = await tramiteService.postDocumentoInscripcionCarrera(mock);

      expect(response).toEqual(mock);
      expect(mainServiceSpy.post).toHaveBeenCalled();
    });

    it('should be postDocumentoInscripcionCarrera request error', async () => {
      const mock = mockDataDocumentoSave();
      mainServiceSpy.post.withArgs(jasmine.any(String), jasmine.any(Object)).and.returnValue(Promise.reject(undefined));

      try {
        await tramiteService.postDocumentoInscripcionCarrera(mock);
      } catch (error) {
        expect(error).toBeUndefined();
      }
      expect(mainServiceSpy.post).toHaveBeenCalled();
    });
  })

  describe('should be putDocumentoInscripcionCarrera', () => {
    it('should be putDocumentoInscripcionCarrera request ok', async () => {
      const mockData = mockDataDocumentoUpdate();
      const mockDataResponse = mockDataDocumentoSave();
      mainServiceSpy.put.withArgs(jasmine.any(String), jasmine.any(Object)).and.returnValue(Promise.resolve(mockDataResponse));

      const response = await tramiteService.putDocumentoInscripcionCarrera(mockData);

      expect(response).toEqual(mockDataResponse);
      expect(mainServiceSpy.put).toHaveBeenCalled();
    });

    it('should be putDocumentoInscripcionCarrera request error', async () => {
      const mock = mockDataDocumentoUpdate();
      mainServiceSpy.put.withArgs(jasmine.any(String), jasmine.any(Object)).and.returnValue(Promise.reject(undefined));

      try {
        await tramiteService.putDocumentoInscripcionCarrera(mock);
      } catch (error) {
        expect(error).toBeUndefined();
      }
      expect(mainServiceSpy.put).toHaveBeenCalled();
    });
  })

  describe('should be postDocumentoOperacion', () => {
    it('should be postDocumentoOperacion request ok', async () => {
      const mockData = mockDataOperacionSave();
      const mockDataResponse = mockDataOperacionResponse();
      mainServiceSpy.post.withArgs(jasmine.any(String), jasmine.any(Object)).and.returnValue(Promise.resolve(mockDataResponse));

      const response = await tramiteService.postDocumentoOperacion(mockData);

      expect(response).toEqual(mockDataResponse);
      expect(mainServiceSpy.post).toHaveBeenCalled();
    });

    it('should be postDocumentoOperacion request error', async () => {
      const mockData = mockDataOperacionSave();
      mainServiceSpy.post.withArgs(jasmine.any(String), jasmine.any(Object)).and.returnValue(Promise.reject(undefined));

      try {
        await tramiteService.postDocumentoOperacion(mockData);
      } catch (error) {
        expect(error).toBeUndefined();
      }
      expect(mainServiceSpy.post).toHaveBeenCalled();
    });
  })

  describe('should be getListOperaciones by documentoInscripcionCarreraId', () => {
    it('should be getListOperaciones request ok', async () => {
      const mock = mockOperacionList();
      const documentoInscripcionCarreraId = 2813;

      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve(mock));

      const response = await tramiteService.getListOperaciones(documentoInscripcionCarreraId);

      expect(response?.length).toEqual(mock.length);
      expect(response?.[0]).toEqual(mock[0]);
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });

    it('should be getListOperaciones request error', async () => {
      const documentoInscripcionCarreraId = 2813;

      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.reject(undefined));

      try {
        await tramiteService.getListOperaciones(documentoInscripcionCarreraId);
      } catch (error) {
        expect(error).toBeUndefined();
      }
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });

    it('should be getListOperaciones request find empty', async () => {
      const mock: DocumentoOperacion[] = [];
      const documentoInscripcionCarreraId = 2813;

      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve(mock));

      const response = await tramiteService.getListOperaciones(documentoInscripcionCarreraId);

      expect(response?.length).toEqual(mock.length);
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });
  })

  describe('should be getListTramiteUniversidad', () => {
    it('should be getListTramiteUniversidad request ok', async () => {
      const mock = mockTramiteList();

      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve(mock));

      const response = await tramiteService.getListTramiteUniversidad();

      expect(response?.length).toEqual(mock.length);
      expect(response?.[0]).toEqual(mock[0]);
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });

    it('should be getListTramiteUniversidad request error', async () => {
      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.reject(undefined));

      try {
        await tramiteService.getListTramiteUniversidad();
      } catch (error) {
        expect(error).toBeUndefined();
      }
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });
  })

  describe('should be getDropDownTramiteSubTipo', () => {
    it('should be getDropDownTramiteSubTipo request ok', async () => {
      const mock = mockDropDownList();

      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve(mock));

      const response = await tramiteService.getDropDownTramiteSubTipo();

      expect(response.length).toEqual(mock.length);
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });

    it('should be getDropDownTramiteSubTipo request error', async () => {
      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.reject(undefined));

      try {
        await tramiteService.getDropDownTramiteSubTipo();
      } catch (error) {
        expect(error).toBeUndefined();
      }
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });

    it('should be getDropDownTramiteSubTipo request empty', async () => {
      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve([]));
      const response = await tramiteService.getDropDownTramiteSubTipo();
      expect(response.length).toEqual(0);
    });
  })

  describe('should be getDropDownDocumentoOperacionTipo', () => {
    it('should be getDropDownDocumentoOperacionTipo request ok', async () => {
      const mock = mockDropDownList();

      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve(mock));

      const response = await tramiteService.getDropDownDocumentoOperacionTipo();

      expect(response.length).toEqual(mock.length);
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });

    it('should be getDropDownDocumentoOperacionTipo request error', async () => {
      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.reject(undefined));

      try {
        await tramiteService.getDropDownDocumentoOperacionTipo();
      } catch (error) {
        expect(error).toBeUndefined();
      }
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });

    it('should be getDropDownDocumentoOperacionTipo request empty', async () => {
      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve([]));
      const response = await tramiteService.getDropDownDocumentoOperacionTipo();
      expect(response.length).toEqual(0);
    });
  })

  describe('should be getDropDownDocumentoEstado', () => {
    it('should be getDropDownDocumentoEstado request ok', async () => {
      const mock = mockDropDownList();

      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve(mock));

      const response = await tramiteService.getDropDownDocumentoEstado();

      expect(response.length).toEqual(mock.length);
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });

    it('should be getDropDownDocumentoEstado request error', async () => {
      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.reject(undefined));

      try {
        await tramiteService.getDropDownDocumentoEstado();
      } catch (error) {
        expect(error).toBeUndefined();
      }
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });

    it('should be getDropDownDocumentoEstado request empty', async () => {
      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve([]));
      const response = await tramiteService.getDropDownDocumentoEstado();
      expect(response.length).toEqual(0);
    });
  })

  describe('should be getDropDownDocumentoTipo', () => {
    it('should be getDropDownDocumentoTipo request ok', async () => {
      const mock = mockDropDownList();

      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve(mock));

      const response = await tramiteService.getDropDownDocumentoTipo();

      expect(response.length).toEqual(mock.length);
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });

    it('should be getDropDownDocumentoTipo request error', async () => {
      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.reject(undefined));

      try {
        await tramiteService.getDropDownDocumentoTipo();
      } catch (error) {
        expect(error).toBeUndefined();
      }
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });

    it('should be getDropDownDocumentoTipo request empty', async () => {
      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve([]));
      const response = await tramiteService.getDropDownDocumentoTipo();
      expect(response.length).toEqual(0);
    });
  })

  describe('should be getDropDownDocumentoPlantillaEstado', () => {
    it('should be getDropDownDocumentoPlantillaEstado request ok', async () => {
      const mock = mockDropDownList();

      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve(mock));

      const response = await tramiteService.getDropDownDocumentoPlantillaEstado();

      expect(response.length).toEqual(mock.length);
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });

    it('should be getDropDownDocumentoPlantillaEstado request error', async () => {
      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.reject(undefined));

      try {
        await tramiteService.getDropDownDocumentoPlantillaEstado();
      } catch (error) {
        expect(error).toBeUndefined();
      }
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });

    it('should be getDropDownDocumentoPlantillaEstado request empty', async () => {
      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve([]));
      const response = await tramiteService.getDropDownDocumentoPlantillaEstado();
      expect(response.length).toEqual(0);
    });
  })

  describe('should be getDropDownCarrera', () => {
    it('should be getDropDownCarrera request ok', async () => {
      const mock = mockDropDownList();

      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve(mock));

      const response = await tramiteService.getDropDownCarrera();

      expect(response.length).toEqual(mock.length);
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });

    it('should be getDropDownCarrera request error', async () => {
      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.reject(undefined));

      try {
        await tramiteService.getDropDownCarrera();
      } catch (error) {
        expect(error).toBeUndefined();
      }
      expect(mainServiceSpy.get).toHaveBeenCalled();
    });

    it('should be getDropDownCarrera request empty', async () => {
      mainServiceSpy.get.withArgs(jasmine.any(String)).and.returnValue(Promise.resolve([]));
      const response = await tramiteService.getDropDownCarrera();
      expect(response.length).toEqual(0);
    });
  })
});
