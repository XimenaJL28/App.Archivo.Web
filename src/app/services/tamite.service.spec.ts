import { TestBed } from '@angular/core/testing';

import { TramiteService } from './tramite.service';

xdescribe('TramiteService', () => {
  let service: TramiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TramiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
