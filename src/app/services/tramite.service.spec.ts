import { TestBed } from '@angular/core/testing';

import { TramiteService } from './tramite.service';
import { MainService } from './main.service';

fdescribe('TramiteService', () => {
  let service: TramiteService;
  // dependencia del servicio, creando un Spy (espia)
  let mainServiceSpy: jasmine.SpyObj<MainService>;

  beforeEach(() => {
    
    TestBed.configureTestingModule({});
    service = TestBed.inject(TramiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
