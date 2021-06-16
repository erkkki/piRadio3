import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {StationHistoryService} from './station-history.service';
import {stationsMock} from '../mockdata/station.mock';
import {before} from 'lodash-es';
import {environment} from '../../../environments/environment';

describe('Station history service', () => {
  let service: StationHistoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StationHistoryService],
    });

    service = TestBed.inject(StationHistoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    localStorage.clear();
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return empty list of stations', () => {
    service.getStations().subscribe(data => {
      expect(data).toEqual([]);
    });
  });

  it('should call api to get station', () =>  {
    const station = stationsMock[0];
    service.loadStationFromApi(station.stationuuid);

    let req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/stations/byuuid?uuids=f15a6b99-6674-11ea-be63-52543be04c81`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should save station uuid and return new list', () => {
    let index = 0;
    const station = stationsMock[0];
    const stationTwo = stationsMock[3];
    const expectedValues = [[], [station], [station, stationTwo]];

    service.getStations().subscribe(data => {
      expect(data).toEqual(expectedValues[index]);
      index++;
    });

    service.add(station);
    service.add(stationTwo);
  });

  it('should remove station and return new list', () => {
    let index = 0;
    const station = stationsMock[0];
    const stationTwo = stationsMock[3];
    const expectedValues = [[], [station], [station, stationTwo], [stationTwo]];

    service.getStations().subscribe(data => {
      expect(data).toEqual(expectedValues[index]);
      index++;
    });

    service.add(station);
    service.add(stationTwo);

    service.remove(station);
  });

  it('should test save to localstorage.', () => {
    const stations = [stationsMock[0], stationsMock[1]];
    const exceptedResult = [stationsMock[0].stationuuid, stationsMock[1].stationuuid];

    expect(service.saveToLocalStorage(stations)).toEqual(JSON.stringify(exceptedResult));
  });

  it('should test load from localstorage.', () => {
    const exceptedResult = [stationsMock[0].stationuuid, stationsMock[1].stationuuid];

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(exceptedResult));
    expect(service.loadFromLocalStorage()).toEqual(exceptedResult);
  });


  it('should return stations in order and test max station count', () => {
    const stations = stationsMock.slice(0, 50);
    const expectedResult = stationsMock.slice(40, 50);

    stations.forEach(station => {
      service.add(station);
    });

    service.getStations().subscribe(value => {
      expect(value).toEqual(expectedResult);
    });
  });

});
