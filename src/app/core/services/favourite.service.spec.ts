import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { FavouriteService } from './favourite.service';
import { stationsMock } from '../mockdata/station.mock';
import {FavouriteListMock, FavouriteListMockApiResponse} from '../mockdata/favourite.mock';
import {environment} from '../../../environments/environment';
import {of} from 'rxjs';

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
    service.getStations().subscribe(data => {
      expect(data).toEqual([]);
    });
  });


  it('should add station', () => {
    service.add(stationsMock[0]);

    service.getStations().subscribe(data => {
      expect(data).toEqual([stationsMock[0]]);
    });
  });

  it('should add multiple stations', () => {
    service.add(stationsMock[0]);
    service.add(stationsMock[1]);
    service.add(stationsMock[2]);

    service.getStations().subscribe(data => {
      expect(data).toEqual([stationsMock[0], stationsMock[1], stationsMock[2]]);
    });
  });

  it('should remove station', () => {

    let index = 0;
    const expectedResults = [
      [stationsMock[0], stationsMock[1], stationsMock[2]],
      [stationsMock[0], stationsMock[2]]
    ];

    service.add(stationsMock[0]);
    service.add(stationsMock[1]);
    service.add(stationsMock[2]);


    service.getStations().subscribe(data => {
      expect(data).toEqual(expectedResults[index]);
      index++;
    });

    service.remove(stationsMock[1]);
  });

  it('should test init function to load favourite stations', () => {
    spyOn(service, 'apiGetList').and.returnValue(of(FavouriteListMock));
    service.init();

    FavouriteListMockApiResponse.forEach(data => {
      let req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/stations/byuuid?uuids=${data.stationuuid}`);
      req.flush([data]);
    });

    service.getStations().subscribe(data => {
      expect(data).toEqual(FavouriteListMockApiResponse);
    });
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
});
