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


  it('should get empty list of favourite stations', () => {
    let favourites = service.getStations();
    expect(favourites).toEqual([]);
  });


  it('should add station', () => {
    service.add(stationsMock[0]);

    let favourites = service.getStations();
    expect(favourites).toEqual([stationsMock[0]]);
  });

  it('should add multiple stations', () => {
    service.add(stationsMock[0]);
    service.add(stationsMock[1]);
    service.add(stationsMock[2]);

    let favourites = service.getStations();
    expect(favourites).toEqual([stationsMock[0], stationsMock[1], stationsMock[2]]);
  });

  it('should remove station', () => {
    service.add(stationsMock[0]);
    service.add(stationsMock[1]);
    service.add(stationsMock[2]);

    let favourites = service.getStations();
    expect(favourites).toEqual([stationsMock[0], stationsMock[1], stationsMock[2]]);

    service.remove(stationsMock[1]);

    favourites = service.getStations();
    expect(favourites).toEqual([stationsMock[0], stationsMock[2]]);
  });

  it('should call api to get stations', () => {
    service.apiGetList().subscribe();

    const req = httpTestingController.expectOne(`${environment.apiUrl}/api/favourite_stations.json`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should call api to add station', () => {
    const station = stationsMock[0];
    service.apiAdd(station).subscribe();

    const req = httpTestingController.expectOne(`${environment.apiUrl}/api/favourite_stations.json`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should call api to remove station', () => {
    const station = stationsMock[0];
    service.apiRemove(station).subscribe();

    const req = httpTestingController.expectOne(`${environment.apiUrl}/api/favourite_stations/${station.stationuuid}.json`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should call api to get station', () => {
    const station = stationsMock[0];
    service.apiGet(station).subscribe();

    const req = httpTestingController.expectOne(`${environment.apiUrl}/api/favourite_stations/${station.stationuuid}.json`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
