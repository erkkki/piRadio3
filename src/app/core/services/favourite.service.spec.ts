import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { FavouriteService } from './favourite.service';
import { FavouriteStation } from '../models/station';
import {environment} from '../../../environments/environment';

describe('FavouriteService', () => {
  let service: FavouriteService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FavouriteService],
    });
    service = TestBed.inject(FavouriteService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Get Favourite stations list.', () => {
    const data = [];

    service.getFavourites().subscribe((result) => {
      expect(result).toBe(data);
    });

    const req = httpMock.expectOne(environment.apiUrl + '/api/favourite_stations.json');

    req.flush(data);

    expect(req.request.method).toBe('GET');
  });
});
