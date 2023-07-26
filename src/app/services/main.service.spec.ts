import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Router } from '@angular/router'
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';

import { MainService } from './main.service';
import { environment } from '../../environments/environment';

describe('MainService', () => {
  let mainService: MainService;
  let messageService: MessageService;
  let router: Router;

  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MainService,
        MessageService
      ],
      imports: [HttpClientTestingModule, RouterModule]
    });
    mainService = TestBed.inject(MainService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  })

  it('should be created', () => {
    expect(mainService).toBeTruthy();
  });

  describe('test for request', () => {
    it('test for get request', () => {
      const mockData = {};
      const url = `${environment.endPoint}`;

      mainService.get(url)
        .then((response) => {
          expect(response).toEqual(mockData)
        });

      const request = httpController.expectOne(url)
      request.flush(mockData);
    })

    it('test for post request', () => {
      const mockData = {};
      const url = `${environment.endPoint}`;

      mainService.post(url, {})
        .then((response) => {
          expect(response).toEqual(mockData)
        })

      const request = httpController.expectOne(url)
      request.flush(mockData);
    })

    it('test for put request', () => {
      const mockData = {};
      const url = `${environment.endPoint}`;

      mainService.put(url, {})
        .then((response) => {
          expect(response).toEqual(mockData)
        })

      const request = httpController.expectOne(url)
      request.flush(mockData);
    })
  })
});
