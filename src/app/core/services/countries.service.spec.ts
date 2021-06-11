import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {skip} from 'rxjs/operators';

import {CountriesService} from './countries.service';
import {RadioApiService} from './radio-api.service';
import {countriesMock} from '../mockdata/countries.mock';


describe('Countries service', () => {
  let service: CountriesService;
  let radioApiService: RadioApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountriesService, RadioApiService]
    });

    service = TestBed.inject(CountriesService);
    radioApiService = TestBed.inject(RadioApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty list of countries', () => {
    service.getCountries().subscribe(data => {
      expect(data.length).toBe(0);
    });
  });

  it('should return list of countries', () => {
    spyOn(radioApiService, 'getCountries').and.returnValue(of(countriesMock));

    service.getCountries().pipe(skip(1)).subscribe(data => {
      expect(data.length).toBe(countriesMock.length);
    });
  });
});
