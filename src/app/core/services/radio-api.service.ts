import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, filter, switchMap} from 'rxjs/operators';

import {RadioApiServerService} from './radio-api-server.service';
import {Station} from '../models/station.interface';

@Injectable({
  providedIn: 'root'
})
export class RadioApiService {

  constructor(private http: HttpClient, private serverService: RadioApiServerService) {}

  private get serverUrl(): Observable<string> {
    return this.serverService.server$.pipe(
      filter(servers => servers !== null),
      map(server => server.name),
    );
  }

  clickStation(station: Station): void {
    if (!station.stationuuid) {
      return;
    }
    this.serverUrl.pipe(
      filter(countries => countries !== null),
      switchMap(name => {
        return this.http.get(`https://${name}/json/url/${station.stationuuid}`);
      })
    ).subscribe();
  }

  getCountries(): Observable<any> {
    return this.serverUrl.pipe(
      filter(countries => countries !== null),
      switchMap(name => {
        return this.http.get(`https://${name}/json/countries`);
      })
    );
  }

  getTags(): Observable<any> {
    return this.serverUrl.pipe(
      filter(tags => tags !== null),
      switchMap(name => {
        return this.http.get(`https://${name}/json/tags`);
      })
    );
  }

  getStats(): Observable<any> {
    return this.serverUrl.pipe(
      switchMap(name => {
        return this.http.get(`https://${name}/json/stats`);
      })
    );
  }

  getTopStation(): Observable<any> {
    const count = 100;
    return this.serverUrl.pipe(
      switchMap(name => {
        return this.http.get(`https://${name}/json/stations/topvote/${count}`);
      })
    );
  }

  getStationsBy(by: string, search: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.serverUrl.pipe(
      switchMap(name => {
        return this.http.get(`https://${name}/json/stations/${by}/${search}`, { params });
      })
    );
  }

  getStationsSearch(params: HttpParams = new HttpParams()): Observable<any> {
    return this.serverUrl.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(name => {
        return this.http.get(`https://${name}/json/stations/search`, { params });
      })
    );
  }
}
