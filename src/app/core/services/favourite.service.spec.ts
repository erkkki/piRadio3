import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { FavouriteService } from './favourite.service';
import { stationsMock } from '../mockdata/station.mock';
import {environment} from '../../../environments/environment';

describe('FavouriteService', () => {
  let service: FavouriteService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FavouriteService],
    });

    service = TestBed.inject(FavouriteService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Get empty list of favourite stations', () => {
    let favourites = service.getStations();
    expect(favourites).toEqual([]);
  });

  it('Add new station', () => {
    service.addStation(stationsMock[0]);

    let favourites = service.getStations();
    expect(favourites).toEqual([stationsMock[0]]);
  });

  it('Add multiple stations', () => {
    service.addStation(stationsMock[0]);
    service.addStation(stationsMock[1]);
    service.addStation(stationsMock[2]);

    let favourites = service.getStations();
    expect(favourites).toEqual([stationsMock[0], stationsMock[1], stationsMock[2]]);
  });

  it('Remove station', () => {
    service.addStation(stationsMock[0]);
    service.addStation(stationsMock[1]);
    service.addStation(stationsMock[2]);

    let favourites = service.getStations();
    expect(favourites).toEqual([stationsMock[0], stationsMock[1], stationsMock[2]]);

    service.removeStation(stationsMock[1]);

    favourites = service.getStations();
    expect(favourites).toEqual([stationsMock[0], stationsMock[2]]);
  });

  // it('Get Favourite stations', () => {
  //   const data = [];
  //
  //   service.getFavourites()
  //     .subscribe((result) => {
  //       expect(result).toBe(data);
  //     });
  //
  //   const req = httpTestingController.expectOne(environment.apiUrl + '/api/favourite_stations.json');
  //
  //   expect(req.request.method).toBe('GET');
  //
  //   req.flush(data);
  // });
});
