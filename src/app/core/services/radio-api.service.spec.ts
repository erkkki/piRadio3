import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {RadioApiService} from './radio-api.service';
import {of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {countriesMock} from '../mockdata/countries.mock';
import {stationsMock} from '../mockdata/station.mock';


describe('Radio api service', () => {
  let service: RadioApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RadioApiService],
    });

    service = TestBed.inject(RadioApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call radio api to get countries.', () => {
    service.getCountries().subscribe();

    let req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/countries/?order=name&reverse=false&hidebroken=true&offset=0&limit=1000`);
    expect(req.request.method).toBe('GET');
    req.flush({});

    service.getCountries({filter: 'fi', params: {limit: 5, hidebroken: false}}).subscribe(data => {});
    req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/countries/fi?order=name&reverse=false&hidebroken=false&offset=0&limit=5`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should call radio api to get country codes.', () => {
    service.getCountryCodes().subscribe();

    const req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/countrycodes/?order=name&reverse=false&hidebroken=true&offset=0&limit=1000`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should call radio api to get codecs.', () => {
    service.getCodecs().subscribe();

    const req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/codecs/?order=name&reverse=false&hidebroken=true&offset=0&limit=1000`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should call radio api to get states.', () => {
    service.getStates().subscribe();

    let req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/states/?order=name&reverse=false&hidebroken=true&offset=0&limit=1000`);
    expect(req.request.method).toBe('GET');
    req.flush({});


    service.getStates({filter: 'ber'}).subscribe();

    req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/states/ber?order=name&reverse=false&hidebroken=true&offset=0&limit=1000`);
    expect(req.request.method).toBe('GET');
    req.flush({});

    service.getStates({filter: 'ber', country: 'Germany'}).subscribe();

    req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/states/Germany/ber?order=name&reverse=false&hidebroken=true&offset=0&limit=1000`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should call radio api to get languages.', () => {
    service.getLanguages().subscribe();

    const req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/languages/?order=name&reverse=false&hidebroken=true&offset=0&limit=1000`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should get tags / genres list from api', () => {
    service.getTags().subscribe();

    const req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/tags/?order=name&reverse=false&hidebroken=true&offset=0&limit=1000`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should get stations by search', () => {
    service.getStationsBy('jazz', 'byname').subscribe();

    let req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/stations/byname/jazz?order=name&reverse=false&hidebroken=true&offset=0&limit=1000`);
    expect(req.request.method).toBe('GET');
    req.flush({});

    service.getStationsBy('austria', 'bycountry').subscribe();

    req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/stations/bycountry/austria?order=name&reverse=false&hidebroken=true&offset=0&limit=1000`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should get all stations', () => {
    service.getStations().subscribe();

    let req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/stations?order=name&reverse=false&hidebroken=true&offset=0&limit=1000`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should get clicks', () => {
    service.getClicks().subscribe();

    let req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/clicks?stationuuid=&lastclickuuid=&seconds=0`);
    expect(req.request.method).toBe('GET');
    req.flush({});

    service.getClicks({seconds: 10000}).subscribe();

    req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/clicks?stationuuid=&lastclickuuid=&seconds=10000`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should send click call to api', () =>  {
    const station = stationsMock[0];
    service.clickStation(station).subscribe();

    const req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/url/${station.stationuuid}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should send station search call to api', () =>  {
    service.searchStations().subscribe();

    let req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/stations/search?order=name&reverse=false&hidebroken=true&offset=0&limit=1000`);
    expect(req.request.method).toBe('GET');
    req.flush({});

    service.searchStations({params: {country: 'Finland'}}).subscribe();

    req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/stations/search?order=name&reverse=false&hidebroken=true&offset=0&limit=1000&country=Finland`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should send search stations by uuid', () =>  {
    const uuids = [];
    uuids.push(stationsMock[0].stationuuid);
    uuids.push(stationsMock[1].stationuuid);
    let temp = uuids.join(',');
    service.searchStationsByUuid({uuids: temp}).subscribe();

    const req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/stations/byuuid?uuids=${stationsMock[0].stationuuid},${stationsMock[1].stationuuid}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should send search stations by votes', () =>  {
    service.searchStationsByVotes().subscribe();

    const req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/stations/topvote/1000?limit=1000&hidebroken=true`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should send search stations by recent click', () =>  {
    service.searchStationsByRecentClick().subscribe();

    const req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/stations/lastclick/1000?limit=1000&hidebroken=true`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should send search stations by lastchange', () =>  {
    service.searchStationsByRecentClick().subscribe();

    const req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/stations/lastclick/1000?limit=1000&hidebroken=true`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should send vote for station', () =>  {
    const station = stationsMock[0];
    service.voteStation(station).subscribe();

    const req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/vote/f15a6b99-6674-11ea-be63-52543be04c81`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should get server stats', () =>  {
    service.getServerStats().subscribe();

    const req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/stats`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should get server config', () =>  {
    service.getServerConfig().subscribe();

    const req = httpTestingController.expectOne(`https://${environment.radioApiUrl}/json/config`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
