import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {skip} from 'rxjs/operators';


import {RadioApiService} from './radio-api.service';
import {GenresService} from './genres.service';
import {genrersMock} from '../mockdata/genres.mock';

describe('Genre / tag service', () => {
  let service: GenresService;
  let radioApiService: RadioApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GenresService, RadioApiService]
    });

    service = TestBed.inject(GenresService);
    radioApiService = TestBed.inject(RadioApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty list of tags', () => {
    service.getGenres().subscribe(data => {
      expect(data.length).toBe(0);
    });
  });

  it('should return list of tags', () => {
    spyOn(radioApiService, 'getTags').and.returnValue(of(genrersMock));

    service.getGenres().pipe(skip(1)).subscribe(data => {
      expect(data.length).toBe(genrersMock.length);
    });
  });
});
